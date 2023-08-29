import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: Number
  })
  tg_id: string;

  @Prop({
    type: Boolean
  })
  is_bot: boolean;

  @Prop({
    type: String,
    min: 3,
    max: 50,
    required: true
  })
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  username: string;

  @Prop({
    type: Types.ObjectId,
    ref: "category"
  })
  category: string
}

export const UserSchema = SchemaFactory.createForClass(User);