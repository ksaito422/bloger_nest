import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { verifyIdToken } from 'src/common/util/verifyIdToken';
import { UserFindInterceptor } from './interceptor/user.find.interceptor';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 利用者情報取得
   */
  @Get(':userId')
  @UseInterceptors(UserFindInterceptor)
  fetchUser(@Param('userId') userId: string, @Headers() headers: Headers) {
    verifyIdToken(headers);
    return this.userService.fetchUser(userId);
  }
}
