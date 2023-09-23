import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Prize {
  @Prop()
  matching_count: number;

  @Prop()
  price: number;
}

export const prize_schema = SchemaFactory.createForClass(Prize);
