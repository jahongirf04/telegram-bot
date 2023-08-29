import { keyboards } from './../enums/keyboard.enums';
import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Context, Markup } from 'telegraf';
import { Ctx, Hears } from 'nestjs-telegraf';
import { isAdmin } from '../utils/is_admin';

@Injectable()
export class AdminService {

  start(ctx: Context){
    const keyboard = Markup.keyboard([keyboards.addProduct]).resize().oneTime();

    ctx.reply("Assalomu aleykumadmin aka, xush kelibsiz", keyboard);
  }

  addProduct(ctx: Context) {
    console.log("proct added");
    
  }
}
