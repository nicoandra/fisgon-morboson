import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CamerasService } from './cameras.service';

@Module({
    imports: [HttpModule],
  providers: [CamerasService], exports:[CamerasService]
})
export class CamerasModule {}
