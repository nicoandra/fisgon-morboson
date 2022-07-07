import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CamerasService } from './cameras.service'

@ApiTags('cameras')
@Controller()
export class CamerasController {

    constructor(@Inject(CamerasService) private readonly camerasService: CamerasService) {
    }

  @Get()
  @ApiOkResponse({type: "application/json"})
  root() {
    return this.camerasService.getStatus()
  }


}
