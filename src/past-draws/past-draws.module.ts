import { Module } from '@nestjs/common';
import { PastDrawsService } from './past-draws.service';
import { PastDrawsController } from './past-draws.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PastDraws, past_draws_schema } from './schema/past_draws.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PastDraws.name, schema: past_draws_schema },
    ]),
    UserModule,
  ],
  providers: [PastDrawsService],
  controllers: [PastDrawsController],
})
export class PastDrawsModule {}
