import { Module } from '@nestjs/common';
import { FavNumbersService } from './fav-numbers.service';
import { FavNumbersController } from './fav-numbers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FavNumbers, fav_number_schema } from './schema/fav-numbers.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FavNumbers.name, schema: fav_number_schema },
    ]),
    UserModule,
  ],
  providers: [FavNumbersService],
  controllers: [FavNumbersController],
})
export class FavNumbersModule {}
