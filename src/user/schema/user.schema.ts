import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';

@Schema()
export class User {
  @Prop({})
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  date_of_birth: Date;

  @Prop()
  gender: string;

  @Prop()
  country_code: string;

  @Prop()
  otp:string;

  @Prop({ type: String })
  fcm_token: string;

  @Prop({ type: String, default: 'User' })
  roles: string;

  @Prop({ required: true, default: false })
  is_active: boolean;

  @Prop({ required: true, default: Date.now() })
  created_at: Date;

  @Prop({ required: true, default: Date.now() })
  updated_at: Date;

  @Prop({ required: true, default: '0.0.0.0' })
  ip_address: string;
}

export const user_schema = SchemaFactory.createForClass(User);

export enum UserRoles {
  ADMIN = 'Admin',
  USER = 'User',
  VENDOR = 'Vendor',
}
