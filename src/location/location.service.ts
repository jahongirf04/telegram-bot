import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './schemas/location.schema';
import { Model } from 'mongoose';

@Injectable()
export class LocationService {

  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>
  ) {}

    create(createLocationDto: CreateLocationDto): Promise<Location> {
      return this.locationModel.create(createLocationDto);
    }

    findAll(): Promise<Location[]> {
      return this.locationModel.find({});
    }
}
