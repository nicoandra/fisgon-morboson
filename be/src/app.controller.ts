import { Controller, Get, Inject } from '@nestjs/common';
import { ApiExcludeController, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { MqttService } from 'nest-mqtt';
import { CamerasService } from './modules/cameras/cameras.service'

@ApiTags('ui')
@Controller()
@ApiExcludeController()
export class AppController {

    constructor(@Inject(MqttService) private readonly mqttService: MqttService,
    @Inject(CamerasService) private readonly camerasService: CamerasService) {
    }

  @Get()
  @ApiOkResponse({type: "application/json"})
  root() {
    return { cameras: this.camerasService.getStatus(), mqtt:  this.mqttService}
  }


  @Get('mqtt')
  @ApiOkResponse({type: "application/json"})
  async mqtt() : Promise<unknown> {
    const r = await new Promise((ok, _) => {
        this.mqttService.publish("fisgon-morboson/default/announce", {alias:"somecrappy", ip: "1.2.3.4"})
        ok({message:"OK"})
    }).then(r => r).catch((err) => {throw err})
    return r;
  }

  @Get('mqtt-bye')
  @ApiOkResponse({type: "application/json"})
  async mqttBye() : Promise<unknown> {
    const r = await new Promise((ok, _) => {
        this.mqttService.publish("fisgon-morboson/default/leave", {})
        ok({message:"OK"})
    }).then(r => r).catch((err) => {throw err})
    return r;
  }  
}
