import crypto from "crypto";
import { Location } from "./Location"

export class Bike{
  public id: string;
  public name: string;
  public type: string;
  public rate: number;
  public body_size: number;
  public description: string;
  public availability: boolean;
  public price_per_hour: number;
  public current_location?: Location;

  constructor(name: string, type: string, rate: number, body_size: number, description: string, price_per_hour: number){
    this.id = crypto.randomUUID();
    this.name = name;
    this.type = type;
    this.rate = rate;
    this.availability = true;
    this.body_size = body_size;
    this.description = description;
    this.price_per_hour = price_per_hour;
  }
}