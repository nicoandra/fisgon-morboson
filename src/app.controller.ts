import { Get, Controller, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ui')
@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}