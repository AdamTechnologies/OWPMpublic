import { Body, Controller, Get, Post } from '@nestjs/common';
import { LiveUrlService } from './live-url.service';

@Controller('live-url')
export class LiveUrlController {
  constructor(private readonly liveUrlService: LiveUrlService) {}

  @Get()
  getUrl() {
    return this.liveUrlService.get();
  }

  @Post('/add')
  add(@Body('url') url: string) {
    return this.liveUrlService.addLiveUrl(url);
  }
}
