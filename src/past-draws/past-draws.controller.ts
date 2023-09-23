import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { PastDrawsService } from './past-draws.service';
import { createPastDrawDto } from './dto/past_draws.create.dto';
import { updatePastDrawDto } from './dto/past_draws.update.dto';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRoles } from 'src/user/schema/user.schema';
import { RoleGuard } from 'src/shared/guards';

@Controller('past-draws')
export class PastDrawsController {
  constructor(private readonly pastDrawService: PastDrawsService) {}

  @Get('/')
  getAll() {
    return this.pastDrawService.getAll();
  }

  @Post('/add')
  @Roles(UserRoles.ADMIN, UserRoles.USER)
  @UseGuards(RoleGuard)
  addPastDraw(@Body() dto: createPastDrawDto) {
    return this.pastDrawService.addPastDraw(dto);
  }

  @Put('/update')
  updatePastDraw(@Body() dto: updatePastDrawDto) {
    return this.pastDrawService.updatePastDraw(dto);
  }
}
