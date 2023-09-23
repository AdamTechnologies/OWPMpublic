import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class tickets {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  user_id: Types.ObjectId;

  @Prop({ type: String })
  raffle_id: string;

  @Prop()
  number: number[];

  @Prop()
  date: Date;

  @Prop()
  country: string;

  @Prop({})
  purchase_date: Date;
}

export const ticket_schema = SchemaFactory.createForClass(tickets);
