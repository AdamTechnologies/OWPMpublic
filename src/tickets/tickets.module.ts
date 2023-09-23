import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ticket_schema, tickets } from './schema/tickets.schema';
import { UserModule } from 'src/user/user.module';
import { PastDraws, past_draws_schema } from 'src/past-draws/schema/past_draws.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: tickets.name, schema: ticket_schema },
      { name: PastDraws.name, schema: past_draws_schema },
    ]),
    UserModule,
  ],
  providers: [TicketsService],
  controllers: [TicketsController],
})
export class TicketsModule {}
