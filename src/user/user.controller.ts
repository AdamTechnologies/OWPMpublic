import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/shared/decorators';
import { JwtPayload } from 'src/auth/stragtegies';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  getUserProfile(@Req() req, @GetUser() user: JwtPayload) {
    const token = req.headers.authorization.split(' ')[1];
    return this.userService.getUserProfile(token);
  }
}
