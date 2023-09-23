import { Module } from '@nestjs/common';
import { PrizeService } from './prize.service';
import { PrizeController } from './prize.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Prize, prize_schema } from './schema/prize.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Prize.name, schema: prize_schema }]),
    UserModule,
  ],
  providers: [PrizeService],
  controllers: [PrizeController],
})
export class PrizeModule {}
