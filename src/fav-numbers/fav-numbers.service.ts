import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FavNumbers } from './schema/fav-numbers.schema';
import { Model } from 'mongoose';
import { GetUser } from 'src/shared/decorators';
import { JwtPayload } from 'src/auth/stragtegies';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FavNumbersService {
  constructor(
    @InjectModel(FavNumbers.name)
    private readonly favNumberModel: Model<FavNumbers>,
    private readonly userService: UserService,
  ) {}

  async addFavNumber(user: JwtPayload, dto) {
    const user_id = await this.userService.getUserIdByLoyaltyId(user);
    const userExist = await this.favNumberModel.findOne({ user_id });
    if (userExist) {
      userExist.favorite_numbers.push({
        name: dto.name,
        numbers: dto.numbers,
      });
      await userExist.save();
      return { message: 'added' };
    } else {
      const newDoc = new this.favNumberModel({
        user_id: user_id,
        favorite_numbers: [{ name: dto.name, numbers: dto.numbers }],
      });
      await newDoc.save();
      return { message: 'added' };
    }
  }

  async removeFavNumber(user: JwtPayload, favoriteNumberId: string) {
    const user_id = await this.userService.getUserIdByLoyaltyId(user);
    const result = await this.favNumberModel.updateOne(
      { user_id },
      { $pull: { favorite_numbers: { _id: favoriteNumberId } } },
    );
    if (result.modifiedCount > 0) {
      return { message: 'removed' };
    } else {
      return { message: 'not found' };
    }
  }

  async getAllNumbers(@GetUser() user: JwtPayload) {
    try {
      const user_id = await this.userService.getUserIdByLoyaltyId(user);
      const userData = await this.favNumberModel.findOne({ user_id });
      if (!userData) return [];
      if (userData?.favorite_numbers == undefined) {
        return [];
      }
      return userData.favorite_numbers;
    } catch (error) {
      console.log(error);
    }
  }
}
