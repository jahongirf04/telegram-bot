import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LocationDocument = HydratedDocument<Location>;

@Schema()
export class Location {
  @Prop({
    type: String,
    min:3,
    max:50,
    required: true
  })
  name: string;

  @Prop({
    type: Number
  })
  longitude: number;

  @Prop({
    type: Number
  })
  latitude: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);