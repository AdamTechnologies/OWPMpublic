import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as schedule from 'node-schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { generateOTP } from 'src/shared/utils/utils';

@Injectable()
export class AuthService {
  private resetJob: schedule.Job;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailerService,
  ) {}

  async verfiyEmailOTP(email: string, otp: string) {
    const noReplyEmail = `no-reply@${process.env.NODEMAILER_USERNAME}`; // Set the no-reply email address
    await this.mailService.sendMail({
      to: email,
      from: noReplyEmail,
      subject: 'Verify Email',
      template: 'register-otp',
      context: { otp },
    });
    return { message: 'Otp has been send successfully to your email address' };
  }

  async getTokens(userId: string, email: string) {
    const [at] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: process.env.AT_SECRET_KEY,
        },
      ),
    ]);
    return { access_token: at };
  }

  async login(dto) {
    const user = await this.userService.login(dto);
    return this.getTokens(user._id.toString(), user.email);
  }

  async signUp(dto) {
    // try {
      const user = await this.userService.signUp(dto);
      const otp = generateOTP();
      const setOtp = await this.userService.updateOtp(dto.email, otp);
      this.resetJob = schedule.scheduleJob(
        new Date(Date.now() + 2 * 60 * 1000),
        async () => {
          console.log("dsf");
          
          await this.userService.setOtpNull(dto.email);
        },
      );
      if (setOtp) return await this.verfiyEmailOTP(dto.email, otp);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  async verifyOtp(dto){
    const user = await this.userService.verifyEmailOtp(dto.email, dto.otp);
    console.log(user);
    
    const tokens = await this.getTokens(user._id.toString(), user.email);
    return tokens;
  }
}
