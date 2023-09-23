import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { PrizeService } from './prize.service';
import { UserRoles } from 'src/user/schema/user.schema';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RoleGuard } from 'src/shared/guards';

@Controller('prize')
export class PrizeController {
  constructor(private readonly prizeService: PrizeService) {}

  @Get('/')
  get() {
    return this.prizeService.get();
  }

  @Post('/add')
  @Roles(UserRoles.ADMIN,UserRoles.USER)
  @UseGuards(RoleGuard)
  add(@Body() dto) {
    return this.prizeService.add(dto);
  }

  @Put('/update')
  @Roles(UserRoles.ADMIN)
  @UseGuards(RoleGuard)
  update(@Body() dto) {
    return this.prizeService.update(dto);
  }

  @Delete('/delete')
  @Roles(UserRoles.ADMIN)
  @UseGuards(RoleGuard)
  delete(@Body('id') id: string) {
    return this.prizeService.delete(id);
  }
}
