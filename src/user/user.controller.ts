import { Body, Controller, Post } from '@nestjs/common';
import { Payload } from 'src/auth/auth.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  public login(@Body() user: Payload) {
    console.log('user',user)
    return this.userService.createUser(user)
  }
  
}
