import { Body, Controller, Get, Post } from '@nestjs/common';
import { FavNumbersService } from './fav-numbers.service';
import { GetUser } from 'src/shared/decorators';
import { JwtPayload } from 'src/auth/stragtegies';
import { addNumberDto } from './dto';

@Controller('fav-numbers')
export class FavNumbersController {
  constructor(private readonly favNumberService: FavNumbersService) {}

  @Get('/')
  get(@GetUser() user: JwtPayload) {
    return this.favNumberService.getAllNumbers(user);
  }

  @Post('/add')
  add(@Body() dto: addNumberDto, @GetUser() user: JwtPayload) {
    return this.favNumberService.addFavNumber(user, dto);
  }

  @Post('/remove')
  remove(@Body('id') id: string, @GetUser() user: JwtPayload) {
    return this.favNumberService.removeFavNumber(user, id);
  }
}
