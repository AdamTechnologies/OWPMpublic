import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class FavNumbers extends Document {
  @Prop({ type: SchemaTypes.ObjectId })
  user_id: Types.ObjectId;

  @Prop([
    {
      name: { type: String, required: true },
      numbers: [
        // {
        //   type: Number,
        //   required: true,
        //   validate: {
        //     validator: function (val) {
        //       return (
        //         Array.isArray(val) &&
        //         val.length === 7 &&
        //         val.every((n) => Number.isInteger(n) && n >= 1 && n <= 100)
        //       );
        //     },
        //     message: (props) =>
        //       `The 'numbers' array must contain exactly 7 integers between 1 and 100.`,
        //   },
        // },
      ],
    },
  ])
  favorite_numbers: { name: string; numbers: number[] }[];
}

export const fav_number_schema = SchemaFactory.createForClass(FavNumbers);
