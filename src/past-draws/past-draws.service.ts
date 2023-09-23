import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PastDraws } from './schema/past_draws.schema';
import { Model } from 'mongoose';
import { createPastDrawDto } from './dto/past_draws.create.dto';
import { updatePastDrawDto } from './dto/past_draws.update.dto';

@Injectable()
export class PastDrawsService {
  constructor(
    @InjectModel(PastDraws.name)
    private readonly pastDrawModel: Model<PastDraws>,
  ) {}

  async addPastDraw(dto: createPastDrawDto) {
   try {
    await this.pastDrawModel.create(dto);
    return { message: 'Past Draw added' };
   } catch (error) {
    console.log(error);
    
   }
  }

  async updatePastDraw(dto: updatePastDrawDto) {
    await this.pastDrawModel.updateOne({ _id: dto.id }, { $set: dto });
    return { message: 'Updated successfully' };
  }

  async getAll() {
    return await this.pastDrawModel.find().sort({ date: -1 });
  }
}
