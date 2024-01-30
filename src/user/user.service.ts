import { Injectable } from '@nestjs/common';
import { User } from 'src/database/models/user.model';
import { UserRepository } from 'src/database/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(public userRepo: UserRepository) {}

  // public async validatePhoneNumber(phoneNumber: number) {
  //   if(!phoneNumber) return;
  //   let user = await this.userRepo.findOne({ where: { phoneNumber } });
  //   if (user) {
  //     throw new AppError(
  //       'PHONE_NUMBER_ALREADY_REGISTERED',
  //       RESPONSE_CODES.BAD_REQUEST
  //     );
  //   }
  // }
  async createUser(profile: Partial<User>) {
    // await this.validatePhoneNumber(profile.phoneNumber);
    const user = await this.userRepo.create(profile);
    return user;
  }
}
