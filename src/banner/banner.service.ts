import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Banner } from './schema/banner.schema';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner.name) private readonly bannerModel: Model<Banner>,
  ) {}

  async get() {
    return await this.bannerModel.find();
  }

  async create(dto, image: Express.Multer.File) {
    return await this.bannerModel.create({ ...dto, image: image.filename });
  }

  async update(dto, image: Express.Multer.File) {
    try {
      if (image) {
        const brand = await this.bannerModel.findOne({ _id: dto._id });
        this.deleteFile(brand.image);
        await this.bannerModel.updateOne(
          { _id: dto._id },
          { $set: { title: dto.title, image: image.filename } },
        );
        return { message: 'updated successfully' };
      } else {
        await this.bannerModel.updateOne(
          { _id: dto._id },
          { $set: { title: dto.title, image: image.filename } },
        );
        return { message: 'Updated successfully' };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const banner = await this.bannerModel.findOne({ _id: id });
      await this.bannerModel.deleteOne({ _id: id });
      await this.deleteFile(banner.image);
      return { message: 'Banner Deleted' };
    } catch (error) {
      console.log(error);
    }
  }

  deleteFile(filename: string): void {
    try {
      const filePath = path.resolve(__dirname, '..', '..', 'uploads', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      return error;
    }
  }
}
