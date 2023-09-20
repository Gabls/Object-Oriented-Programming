import { Bike } from "./Bike";
import { Client } from "./Client";

export class Rent{
  public protocol: number;
  public buyer: Client;
  public rented_bike: Bike;
  public start_date: Date;
  public end_date?: Date;

  constructor(protocol:number, buyer: Client, rented_bike: Bike, start_date: Date,){
    this.protocol = protocol;
    this.buyer = buyer;
    this.rented_bike = rented_bike;
    this.start_date = start_date;
  }
}