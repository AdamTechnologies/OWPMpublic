import {
  ConflictException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { tickets } from './schema/tickets.schema';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/auth/stragtegies';
import axios from 'axios';
import { getNextMonthOrToday, getNextSundayDate } from '../shared/utils/utils';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { purchaseDto } from './dto';
import * as puppeteer from 'puppeteer';
import { htmlContent } from 'src/shared/constants/certficate.html';
import { UserService } from 'src/user/user.service';
import { ticketNumber } from 'src/shared/constants/ticket';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(tickets.name) private readonly ticketModel: Model<tickets>,
    private readonly mailService: MailerService,
    private readonly userService: UserService,
  ) {}

  async purchaseTicket(dto: purchaseDto, user: JwtPayload, token) {
    const userData = await this.userService.getUserById(user.sub);
    const user_id = user.sub;
    const ticketExist = await this.ticketModel.findOne({
      $or: [{ date: dto.date }],
      number: { $eq: dto.number },
    });

    if (ticketExist) {
      throw new ConflictException('Series already selected');
    }
    const bodyFormData = {
      amount: 20,
      reason: `Ticket Purchase`,
      password: dto.password,
      txn_app: 'OWP_MILLIONERE',
    };
    // try {
    //   const response = await axios.post(
    //     `${process.env.LOYALTY_API}/wallet/purchase`,
    //     bodyFormData,
    //     {
    //       headers: { Authorization: `Bearer ${token}` },
    //     },
    //   );
    // } catch (error) {
    //   console.log(error.response.data);
    //   throw new HttpException(error.response.data.data, 400);
    // }

    const raffle_id = await this.generateUniqueRaffleID();
    const ticket = await this.ticketModel.create({
      user_id: user_id,
      number: dto.number,
      raffle_id,
      date: dto.date,
      country: userData.country_code,
      purchase_date:Date.now
    });
    const mail = await this.sendMailCertificate(
      user.email,
      raffle_id,
      dto.date,
      dto.number.join(' '),
    );
    console.log(mail);
    return ticket;
  }

  async getTicketNumbers() {
    const ticket = ticketNumber;
    return ticket;
  }

  async generateUniqueRaffleID(): Promise<string> {
    const startOfCurrentYear = new Date(new Date().getFullYear(), 0, 1); // January 1st of the current year
    const endOfCurrentYear = new Date(new Date().getFullYear(), 11, 31); // December 31st of the current year
    console.log(startOfCurrentYear, endOfCurrentYear);

    const existingTickets = await this.ticketModel.find({
      date: {
        $gte: startOfCurrentYear,
        $lte: endOfCurrentYear,
      },
    });

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const idLength = 10; // Adjust the desired length of your raffle ID

    let raffle_id = '';

    do {
      raffle_id = '';
      for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        raffle_id += characters.charAt(randomIndex);
      }
    } while (existingTickets.some((ticket) => ticket.raffle_id === raffle_id));

    return raffle_id;
  }

  async getAllPurchased(user: JwtPayload) {
    console.log(user.sub);

    return await this.ticketModel
      .find({ user_id: user.sub })
      .sort({ created_at: -1 });
  }

  async updateTicketNumbers(dto, user: JwtPayload) {
    const ticketExist = await this.ticketModel.findOne({
      $or: [{ date: dto.date }],
      number: { $eq: dto.number },
    });

    if (ticketExist) {
      throw new ConflictException('Series already selected');
    }

    const ticket = await this.ticketModel.findOne({ _id: dto.id });
    const user_id = await this.userService.getUserIdByLoyaltyId(user);
    if (ticket.user_id.toString() !== user_id)
      throw new UnauthorizedException('This is not ur ticket');
    await this.ticketModel.updateOne(
      { _id: dto.id },
      { $set: { number: dto.number } },
    );
    return { message: 'Updated' };
  }

  async getAllNumbers(pageNumber = 1, pageSize = 10000) {
    try {
      const nextSunday = getNextMonthOrToday();
      console.log(nextSunday);

      const totalCount = await this.ticketModel.countDocuments({
        date: nextSunday,
      });

      const totalPages = Math.ceil(totalCount / pageSize);
      const skip = (pageNumber - 1) * pageSize;

      const tickets = await this.ticketModel
        .find({ date: nextSunday })
        .populate({
          path: 'user_id',
          select: 'username email',
        })
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(pageSize);

      return {
        tickets,
        total_count: totalCount,
        current_page: pageNumber,
        total_pages: totalPages,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async sendMailCertificate(
    email: string,
    raffle_id: string,
    date: Date,
    number?: string,
  ) {
    try {
      const pdfBuffer = await this.generatePdfFromHtml(
        htmlContent(raffle_id, date, number),
      );

      const noReplyEmail = `no-reply@${process.env.NODEMAILER_USERNAME}`;
      await this.mailService.sendMail({
        to: email,
        from: noReplyEmail,
        subject: 'Green Certificate',
        template: 'certificate',
        attachments: [
          {
            content: pdfBuffer,
            filename: 'certificate.pdf',
            contentType: 'application/pdf',
          },
        ],
        context: { raffle_id, date, number },
      });

      return {
        message: 'Certificate has been sent successfully to your email address',
      };
    } catch (error) {
      console.log(error);
    }
  }

  async generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.pdf({
      width: '500px',
      height: '758px',
      printBackground: true,
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    });

    // Set the HTML content with styles and background images
    await page.setContent(htmlContent);

    // Wait for all elements with class "background-image-class" to load background images
    await page.waitForSelector('.background-image-class', { visible: true });

    // Regenerate the PDF with the updated content and get the PDF buffer
    const pdfBuffer = await page.pdf({
      width: '500px', // Use the same width as before
      height: '758px', // Use the same height as before
      printBackground: true, // Include background colors and images
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    });

    // Close the browser
    await browser.close();

    return pdfBuffer;
  }

  async genretaeUniqueTicketNumber(dto) {
    const tickeExists = await this.ticketModel.find();
    const current_ticket = tickeExists.find((m) => {
      m._id.toString() === dto.id;
    });
  }

  async getRaffleIdForYearlyDraw() {
    const startOfCurrentYear = new Date(new Date().getFullYear(), 0, 1); // January 1st of the current year
    const endOfCurrentYear = new Date(new Date().getFullYear(), 11, 31); // December 31st of the current year
    const tickets = await this.ticketModel
      .find({
        date: {
          $gte: startOfCurrentYear,
          $lte: endOfCurrentYear,
        },
      })
      .populate({
        path: 'user_id',
        select: 'username email',
      })
      .select('raffle_id user_id date')
      .sort({ created_at: -1 })
      .exec();
    return { tickets, totalCount: tickets.length };
  }

  async getDailyTickets(dto){
    const ticket = await this.ticketModel.find({date:dto.date})
    return {
      ticket,
      ticketCount: ticket.length
    }
  }
}
