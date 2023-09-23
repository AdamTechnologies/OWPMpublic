import {
  ConflictException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/auth/stragtegies';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async login(dto) {
    const userExist = await this.userModel.findOne({ email: dto.email });
    if (userExist) {
      const validPassword = await bcrypt.compare(
        dto.password,
        userExist.password,
      );
      if (!userExist.is_active) {
        throw new UnauthorizedException('Email not verified');
      }
      if (validPassword) {
        return userExist;
      } else {
        throw new UnauthorizedException(
          'Username / Password is incorrect. Please try again.',
        );
      }
    } else {
      throw new UnauthorizedException(
        'Username / Password is incorrect. Please try again.',
      );
    }
  }

  async signUp(dto) {
    const emailExist = await this.userModel.findOne({ email: dto.email });
    console.log(emailExist);
    
    if (emailExist?.is_active) {
      throw new ConflictException('Email already exists');
    } else if (emailExist?.is_active===false) {
      console.log('otp send again');
      return emailExist;
    } else {
      console.log("ASDSD");
      
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      return await this.userModel.create({
        username: dto.username,
        email: dto.email,
        country_code: dto.country_code,
        date_of_birth: dto.date_of_birth,
        gender: dto.gender,
        password: hashedPassword,
      });
    }
  }

  async getUserById(id: string) {
    return await this.userModel.findOne({ _id: id });
  }

  async getUserProfile(loyalty_token: string) {
    try {
      const response = await axios.get(
        `${process.env.LOYALTY_API}/user/profile`,
        {
          headers: { Authorization: `Bearer ${loyalty_token}` },
        },
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      return error.response.data.data;
    }
  }

  async updateOtp(email: string, otp: string) {
    const newOtp = await bcrypt.hash(otp, 10);
    return this.userModel.updateOne(
      { email: email },
      {
        $set: {
          otp: newOtp,
          expirationTime: new Date(Date.now() + 2 * 60 * 1000),
        },
      },
    );
  }

  async setOtpNull(email: string) {
    await this.userModel.updateOne({ email: email }, { $set: { otp: null } });
  }

  async verifyEmailOtp(email: string, otp: string) {
      const user = await this.userModel.findOne({ email: email });
    if(!user) throw new HttpException('Invalid Email',400);
    if(!user.otp) throw new HttpException('Otp Expired',400);
    const validOtp = await bcrypt.compare(otp, user.otp);
    if (!validOtp) throw new UnauthorizedException('Invalid OTP');
    await this.userModel.updateOne(
      { _id: user._id },
      { $set: { is_active: true } },
    );
    return user;
  }

  async getUserIdByLoyaltyId(user: JwtPayload) {
    const userData = await this.userModel.findOne({ loyalty_id: user.sub });
    console.log(user);
    console.log(userData);
    return userData._id.toString();
  }
}
