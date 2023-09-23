import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { GetUser } from 'src/shared/decorators';
import { JwtPayload } from 'src/auth/stragtegies';
import { purchaseDto } from './dto';
import { UserRoles } from 'src/user/schema/user.schema';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RoleGuard } from 'src/shared/guards';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

  @Post('/purchase')
  purchase(@GetUser() user: JwtPayload, @Body() dto: purchaseDto, @Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.ticketService.purchaseTicket(dto, user, token);
  }

  @Get('/')
  get(@GetUser() user: JwtPayload) {
    return this.ticketService.getAllPurchased(user);
  }

  @Get('/get-numbers')
  @Roles(UserRoles.ADMIN)
  // @UseGuards(RoleGuard)
  getNumbers(@Query('page') page: number, @Query('limit') limit: number) {
    return this.ticketService.getAllNumbers(page, limit);
  }

  @Get('/get-yearly-number')
  @Roles(UserRoles.ADMIN)
  // @UseGuards(RoleGuard)
  getRaffleIdForYearlyDraw() {
    return this.ticketService.getRaffleIdForYearlyDraw();
  }

  @Put('/update-number')
  updateTicketNumber(@Body() dto, @GetUser() user: JwtPayload) {
    return this.ticketService.updateTicketNumbers(dto, user);
  }

  @Post('/daily')
  getDailyTicket(@Body() dto) {
    return this.ticketService.getDailyTickets(dto);
  }
}
