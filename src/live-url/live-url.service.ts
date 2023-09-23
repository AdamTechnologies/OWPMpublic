import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { liveUrl } from './schema/live-url.schema';
import { Model } from 'mongoose';

@Injectable()
export class LiveUrlService {
  constructor(
    @InjectModel(liveUrl.name) private readonly liveUrlModel: Model<liveUrl>,
  ) {}

  async get() {
    return await this.liveUrlModel.findOne();
  }

  async addLiveUrl(url) {
    const urlExists = await this.liveUrlModel.findOne();
    if (urlExists) {
      await this.liveUrlModel.updateOne(
        { _id: urlExists._id },
        { $set: { live_url: url } },
      );
      return { message: 'added' };
    } else {
      await this.liveUrlModel.create({ live_url: url });
      return { message: 'added' };
    }
  }
}
