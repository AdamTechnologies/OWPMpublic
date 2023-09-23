import { Get, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Prize } from './schema/prize.schema';
import { Model } from 'mongoose';

@Injectable()
export class PrizeService {
  constructor(
    @InjectModel(Prize.name) private readonly prizeModel: Model<Prize>,
  ) {}

  async get() {
    return this.prizeModel.find().sort({ price: -1 }).exec();
  }

  async add(dto) {
    return this.prizeModel.create(dto);
  }

  async update(dto) {
    await this.prizeModel.updateOne({ _id: dto.id }, { $set: dto });
    return { message: 'updated' };
  }

  async delete(dto) {
    await this.prizeModel.deleteOne({ _id: dto.id });
    return { message: 'Deleted' };
  }
}
