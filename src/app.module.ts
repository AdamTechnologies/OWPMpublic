import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './shared/guards';
import { PastDrawsModule } from './past-draws/past-draws.module';
import { FavNumbersModule } from './fav-numbers/fav-numbers.module';
import { TicketsModule } from './tickets/tickets.module';
import { LiveUrlModule } from './live-url/live-url.module';
import { BannerModule } from './banner/banner.module';
import { PrizeModule } from './prize/prize.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MOGO_URL),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.NODEMAILER_USERNAME,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      },
      template: {
        dir: join(__dirname, 'mails'),
        adapter: new HandlebarsAdapter(),
      },
    }),
    AuthModule,
    UserModule,
    PastDrawsModule,
    FavNumbersModule,
    TicketsModule,
    LiveUrlModule,
    BannerModule,
    PrizeModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Specify the path to the uploads folder
      serveRoot: '/uploads', // Specify the base URL for serving the files
    }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AtGuard }],
})
export class AppModule {}
