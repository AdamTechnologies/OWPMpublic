import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Banner, banner_schema } from './schema/banner.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Banner.name, schema: banner_schema }]),
    UserModule
  ],
  providers: [BannerService],
  controllers: [BannerController],
})
export class BannerModule {}
