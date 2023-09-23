import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/shared/decorators';
import { loginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  login(@Body() dto: loginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post('/sign-up')
  signUp(@Body() dto){
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('/verify-email')
  verifyEmail(@Body() dto){
    console.log(dto);
    
    return this.authService.verifyOtp(dto)
  }
}
