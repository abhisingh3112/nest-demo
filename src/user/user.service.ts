import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/database/models/user.model';
import { UserRepository } from 'src/database/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(public userRepo: UserRepository, private authService: AuthService) {}

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
    let user = await this.userRepo.findOne({ where: { phoneNumber: String(profile.phoneNumber) } });
    console.log('user',user)
    //send OTP
    if(!user) {
      return this.userRepo.create(profile);
    }
    return {};
  }

  async verifyOtp(verify: {otp: number,phoneNumber: number}) {
    let user = await this.userRepo.findOne({ where: { phoneNumber: String(verify.phoneNumber) } });
    console.log('verify',user)
    if(!user) {
      throw new NotFoundException('Invalid phone number')
    }
    if(verify.otp != 1234) {
      throw new UnauthorizedException('Invalid otp')
    }
    //send OTP
    
    return {...user.dataValues, ...this.authService.jwtSign(user.dataValues)};
  }
}
