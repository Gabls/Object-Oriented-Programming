import crypto from "crypto";
import bcrypt from "bcrypt";

export const token = bcrypt.genSaltSync(3);
export class Client{
  private id: string;
  public name: string;
  public email: string;
  public password: string;
  
  constructor(name: string, email: string, password: string){
    this.id = crypto.randomUUID();
    this.name = name;
    this.email = email;
    this.password = bcrypt.hashSync(password, token);
  }
}