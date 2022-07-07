import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CamerasService } from './cameras.service';
import { CamerasController } from './cameras.controller'
@Module({
    imports: [HttpModule],
    providers: [CamerasService], 
    exports:[CamerasService],
    controllers: [CamerasController]

})
export class CamerasModule {}
