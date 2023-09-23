import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PastDraws {
  @Prop()
  date: Date;

  @Prop()
  winning_number: Number[];

  @Prop()
  raffle_id: string;
}

export const past_draws_schema = SchemaFactory.createForClass(PastDraws);
