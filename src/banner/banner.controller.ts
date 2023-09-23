import {
  Body,
  Controller,
  UseInterceptors,
  Delete,
  UploadedFile,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { createBannerDto, updateBannerDto } from './dto';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRoles } from 'src/user/schema/user.schema';
import { RoleGuard } from 'src/shared/guards';
import { uploadInterceptor } from 'src/shared/imageUpload/multer';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  get() {
    return this.bannerService.get();
  }

  @Post('/add')
  @Roles(UserRoles.ADMIN)
  // @UseGuards(RoleGuard)
  @UseInterceptors(uploadInterceptor())
  create(
    @Body() dto: createBannerDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.bannerService.create(dto, image);
  }

  @Put('/update')
  @Roles(UserRoles.ADMIN)
  // @UseGuards(RoleGuard)
  @UseInterceptors(uploadInterceptor())
  update(
    @Body() dto: updateBannerDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.bannerService.update(dto, image);
  }

  @Delete('/delete')
  @Roles(UserRoles.ADMIN)
  // @UseGuards(RoleGuard)
  delete(@Body('id') id: string) {
    return this.bannerService.delete(id);
  }
}
