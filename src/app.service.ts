import { AdminModule } from './admin/admin.module';
import { branches } from './data/mock';
import { Action, Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import { keyboards } from './enums/keyboard.enums';
import { getDistance } from './utils/get-distance.utils';
import { UserService } from './user/user.service';
import { isAdmin } from './utils/is_admin';
import { AdminService } from './admin/admin.service';
import { ProductService } from './product/product.service';

@Update()
export class AppService {
  constructor(private userService: UserService,
    private readonly adminService: AdminService,
    private readonly productService: ProductService) {}
  @Start()
  start(@Ctx() ctx: Context) {
    const id = ctx.from.id;
    if(isAdmin(id)) {
      return this.adminService.start(ctx);
    }
    const keyboard = Markup.keyboard([keyboards.register, keyboards.support])
      .resize()
      .oneTime();
    ctx.reply('salom', keyboard);
  }

  @Hears(keyboards.register)
  register(@Ctx() ctx: Context) {
    const keyboard = Markup.keyboard([
      Markup.button.contactRequest(keyboards.contact),
    ])
      .resize()
      .oneTime();
    ctx.reply(
      "Marhamat telefon raqamingizni yuborgan holatda ro'yhatdan o'ting!",
      keyboard,
    );
  }

  @Hears(keyboards.addProduct)
  addProduct(@Ctx() ctx: Context) {
    const id = ctx.from.id;

    if(!isAdmin(id)) {
      ctx.reply("not authorized to add Product")
    }
    this.adminService.addProduct(ctx);
  }

  @Hears(keyboards.support)
  support(@Ctx() ctx: any) {
    ctx.reply('Savolingizni kiriting');
  } 

  @On('contact')
  async contact(@Ctx() ctx: any) {
    console.log(1);
    
    const phoneNumber = ctx.update.message.contact.phone_number;
    console.log(2);
    
    const user = ctx.update.message.from;
    // await this.userService.create({ tg_id: user.id, ...user });

    const keyboard = Markup.keyboard([
      Markup.button.locationRequest(keyboards.location),
    ])
      .resize()
      .oneTime();
    console.log(phoneNumber);
    ctx.reply('Endi joylashuvingizni yuboring:', keyboard);
  }

  @On('location')
  location(@Ctx() ctx: any) {
    try {
      const location = ctx.update.message.location;

      const nearestBranch = branches.reduce(
        (acc: any, branch: any, index: number) => {
          const distance = getDistance(
            branch.latitude,
            location.latitude,
            branch.longitude,
            location.longitude,
          );

          console.log(branch.name, '=', distance);

          if (!acc) {
            return {
              branchIndex: index,
              distance,
            };
          }

          if (distance < acc.distance)
            return {
              branchIndex: index,
              distance,
            };

          return acc;
        },
        null,
      );

      console.log(ctx.update.message);

      ctx.telegram.sendLocation(
        ctx.update.message.chat.id,
        branches[nearestBranch?.branchIndex].longitude,
        branches[nearestBranch?.branchIndex].latitude,
      );

      ctx.reply(branches[nearestBranch?.branchIndex].name);
    } catch (err) {
      console.log(err);
    }
  }

//   @Action(/^buy-_+/)
//   async buy(ctx: Context){
//     // const action = ctx.chat.split('-')[1]
//     console.log(222);
//     // const product = await this.productService.findOne(action)

//     ctx.telegram.sendInvoice(ctx.chat.id, {
//       provider_token: process.env.PAYMENT_TOKEN,
//       currency: "UZS",
//       prices: [
//         {
//         label: "To'lov",
//         amount: 12000
//         }
//     ],
//   title: "Olma" ,
// description: "shirin olma" ,
// payload: "Mevaga to'lov"  });
//   }
}
