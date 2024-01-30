import { BaseRepository } from "./base.repository";
import { User } from "../models/user.model";
import { Inject, Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {
    super();
    this.context = sequelize.getRepository(User);
  }

  // get user by phone number
  async getUserByPhoneNumber(phoneNumber: number) {
    return this.findOne({where: { phoneNumber }});
  }

  // get user by email
  async getUserByEmail(email: string) {
    return this.findOne({where: { email }});
  }
  
  // get user by phone number
  async getUserByCompletePhNumber(fullPhoneNumber: string) {
    return this.findOne({where: { fullPhoneNumber }});
  }
}