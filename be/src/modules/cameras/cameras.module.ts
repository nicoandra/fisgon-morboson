import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CamerasService } from './cameras.service';
import { CamerasController } from './cameras.controller'
import { FilesystemModule } from './../filesystem/filesystem.module';
@Module({
    imports: [HttpModule, FilesystemModule],
    providers: [CamerasService], 
    exports:[CamerasService],
    controllers: [CamerasController]

})
export class CamerasModule {}
