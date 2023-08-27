import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //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

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
