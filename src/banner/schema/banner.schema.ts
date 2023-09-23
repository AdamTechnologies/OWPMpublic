import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Banner {
  @Prop()
  title: string;

  @Prop()
  image: string;
}

export const banner_schema = SchemaFactory.createForClass(Banner);
