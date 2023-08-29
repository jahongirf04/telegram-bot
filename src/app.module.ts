import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import { User } from './user/schemas/user.schema';
import { Location } from './location/schemas/location.schema';
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN,
    }),
    UserModule,
    LocationModule,
    AdminModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
