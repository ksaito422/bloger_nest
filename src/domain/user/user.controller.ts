import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entity/user';
import { verifyIdToken } from 'src/common/util/verifyIdToken';
import { UserFindInterceptor } from './interceptor/user.find.interceptor';
import { fetchUsersArticlesInterceptor } from './interceptor/fetchUsersArticles.interceptor';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 利用者情報取得
   */
  @Get(':userId')
  @UseInterceptors(UserFindInterceptor)
  fetchUser(
    @Param('userId') userId: string,
    @Headers() headers: Headers,
  ): Promise<User> {
    verifyIdToken(headers);
    return this.userService.fetchUser(userId);
  }

  /**
   * 利用者投稿記事取得
   */
  @Get(':userId/articles')
  @UseInterceptors(fetchUsersArticlesInterceptor)
  fetchUsersArticles(
    @Param('userId') userId: string,
    @Headers() headers: Headers,
  ): Promise<User> {
    verifyIdToken(headers);
    return this.userService.fetchUsersArticles(userId);
  }
}
