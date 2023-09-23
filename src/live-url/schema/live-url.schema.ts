import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class liveUrl {
  @Prop()
  live_url: string;

  @Prop()
  image: string;
}

export const live_url_schema = SchemaFactory.createForClass(liveUrl);
