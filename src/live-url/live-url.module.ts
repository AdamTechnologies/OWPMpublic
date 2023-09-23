import { Module } from '@nestjs/common';
import { LiveUrlService } from './live-url.service';
import { LiveUrlController } from './live-url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { liveUrl, live_url_schema } from './schema/live-url.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: liveUrl.name, schema: live_url_schema },
    ]),
  ],
  providers: [LiveUrlService],
  controllers: [LiveUrlController],
})
export class LiveUrlModule {}
