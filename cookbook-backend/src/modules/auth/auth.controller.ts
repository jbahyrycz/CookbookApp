import { Controller, Post, UseGuards } from '@nestjs/common';
import { BasicGuard } from './basic.guard';
import { UserID } from './user.decorator';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(BasicGuard)
  login(@UserID() userId: number) {
    return userId;
  }
}
