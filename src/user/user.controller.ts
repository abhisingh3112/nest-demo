import { Body, Controller, Post } from '@nestjs/common';
import { Payload } from 'src/auth/auth.interface';
import { UserService } from './user.service';
import { ResponseMessage } from 'src/decorators/response-message.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  @ResponseMessage('OTP send successfully')
  public login(@Body() user: Payload) {
    return this.userService.createUser(user)
  }
  
  @Post('verify-otp')
  @ResponseMessage('Verified successfully')
  public verify(@Body() verify: {otp: number, phoneNumber: number}) {
    console.log('verify',verify)
    return this.userService.verifyOtp(verify)
  }
}
