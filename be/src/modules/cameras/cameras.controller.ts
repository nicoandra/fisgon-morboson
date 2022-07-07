import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CamerasService } from './cameras.service'
import { CameraConfigDto } from './dto/camera-config.dto'


@ApiTags('cameras')
@Controller('cameras')
export class CamerasController {

    constructor(@Inject(CamerasService) private readonly camerasService: CamerasService) {
    }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({operationId: 'get_cameras'})
  @ApiOkResponse({
    description: 'Get cameras list with their status',
    type: CameraConfigDto,
    isArray: true
  })  
  root() : CameraConfigDto[] {
    return Object.values(this.camerasService.getStatus())
  }
}
