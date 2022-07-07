import { ApiProperty } from "@nestjs/swagger"

export class CameraConfigDto {
    @ApiProperty()
    alias: string

    @ApiProperty()
    ip: string

    @ApiProperty()
    delayBetweenBurstOnTimeout: number // In millis
    
    @ApiProperty()
    delayBetweenBursts: number // In millis
    
    @ApiProperty()
    delayBetweenShots: number // In millis
    
    @ApiProperty()
    shotsPerBurst: number // 1 to 100
    
    @ApiProperty()
    lastTimeSeen: Date
    
    @ApiProperty()
    failureCount: number

}