
export class CameraConfigDto {
    alias: string
    ip: string
    delayBetweenBurstOnTimeout: number // In millis
    delayBetweenBursts: number // In millis
    delayBetweenShots: number // In millis
    shotsPerBurst: number // 1 to 100
    lastTimeSeen: Date
    failureCount: number

}