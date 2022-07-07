import { cloneDeep } from 'lodash'
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Subscribe, Payload, Packet, Params } from 'nest-mqtt';
import path from 'path';

import { MqttService } from 'nest-mqtt';
import { mkdir, createWriteStream } from 'fs'
import { AnnounceCameraNotificationDto} from './AnnounceCameraNotificationDto.dto'
import {CameraConfigDto} from './CameraConfigDto.dto'

@Injectable()
export class CamerasService {
    knownCameras: Record<string, CameraConfigDto> = {}
    knownTimeouts: Record<string, NodeJS.Timer> = {}

    constructor(private readonly httpService: HttpService, @Inject(MqttService) private readonly mqttService: MqttService) {}


    @Subscribe('fisgon-morboson/+/announce')
    registerCamera(@Params() params, @Payload() data: AnnounceCameraNotificationDto) {
        const alias = params[0]
        const dto =  new CameraConfigDto()
        const now = new Date()
        dto.alias = alias
        dto.ip = data.ip
        dto.delayBetweenBursts = 1000 * 300
        dto.shotsPerBurst = 5
        dto.delayBetweenShots = 1000 * 3
        dto.lastTimeSeen = now
        dto.failureCount = 0
        this.knownCameras[alias] = dto
        
        this.executeBurst(alias);
        console.log("Known devices", Object.keys(this.knownTimeouts))
    }
    
    setCameraTimeout(alias: string) : void {
        this.unsetCameraTimeout(alias)
        const settings = this.knownCameras[alias];
        this.knownTimeouts[alias] = setTimeout(() => this.executeBurst(alias), settings.delayBetweenBursts)
    }

    unsetCameraTimeout(alias: string) : void {
        if (this.knownTimeouts[alias] !== undefined) {
            clearTimeout(this.knownTimeouts[alias])
            delete this.knownTimeouts[alias]
        }
    }


    setCameraToSleep(alias: string) {
        console.log("Setting ", alias, "to sleep")
        this.mqttService.publish(`fisgon-morboson/${alias}/sleep`, { duration: this.knownCameras[alias].delayBetweenBursts})
    }

    @Subscribe('fisgon-morboson/+/leave')
    unregisterCamera(@Params() params: AnnounceCameraNotificationDto, @Packet() context) {
        const alias = params[0]
        if (this.knownCameras[alias] !== undefined) {
            delete this.knownCameras[alias]
        }

        this.unsetCameraTimeout(alias)
    }

    async executeBurst(alias: string) : Promise<boolean> {
        const settings = this.knownCameras[alias];
        let success = true
        for(let i = 0; i < settings.shotsPerBurst; i++) {
            try {
                await this.getSingleShot(alias)
                await this.waitMs(settings.delayBetweenShots)
                this.knownCameras[alias].lastTimeSeen = new Date()
                this.knownCameras[alias].failureCount = 0                
            } catch (e) {
                this.knownCameras[alias].failureCount++
                success = false
            }
        }
        
        if(success) { 
            this.setCameraToSleep(alias)
        }
        return success;

    }

    async waitMs(ms: number) : Promise<void> {
        await new Promise((ok, ko) => {
            setTimeout(ok, ms)
        })
    }

    async getSingleShot(alias: string) {
        const photoPath = this.getShotPath(alias)
        const photoDir = path.dirname(photoPath)

        await new Promise<void>((ok, ko) => {
            mkdir(photoDir, {recursive: true }, (err) => {
                if(!err) return ok()
                if(err.code == 'EEXISTS') return ok()
                ko(err)
            })
        })

        console.log("Will save to ", photoPath)

        // const uri = 'http://127.0.0.1:3000/shots/sample.jpg'
        const uri = 'http://' + this.knownCameras[alias].ip +':8081/'
        this.httpService.axiosRef.get(
            uri, 
            { responseType: "stream", timeout: this.knownCameras[alias].delayBetweenBurstOnTimeout }
        ).then(async (response) => {
            response.data.pipe(createWriteStream(photoPath))
            return true
        }).catch((err) => {
            console.log("AxiosErr", err)
            return false
        })
        
    }

    getShotPath(alias:string) : string {
        const now = new Date()
        const year = `${now.getUTCFullYear()}`
        const month = `0${now.getUTCMonth()+1}`.slice(-2)
        const day = `0${now.getUTCDate()}`.slice(-2)
        const hour = `0${now.getUTCHours()}`.slice(-2)
        const minute = `0${now.getUTCMinutes()}`.slice(-2)
        const seconds = `0${now.getUTCSeconds()}`.slice(-2)
        return path.join(__dirname, '..', '..', 'public', 'shots', `${alias}`, year, month, day, `${year}${month}${day}T${hour}:${minute}:${seconds}.jpg`)

    }

    getStatus() : Record<string, any> {
        return cloneDeep(this.knownCameras)
    }
}
