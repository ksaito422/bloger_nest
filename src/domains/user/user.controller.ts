import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user';
import { UserFindInterceptor } from './interceptor/user.find.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { fetchUsersArticlesInterceptor } from './interceptor/fetchUsersArticles.interceptor';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 利用者情報取得
   */
  @Get(':userId')
  @UseGuards(AuthGuard('firebase-jwt'))
  @UseInterceptors(UserFindInterceptor)
  fetchUser(@Param('userId') userId: string, @Request() req): Promise<User> {
    return this.userService.fetchUser(req.user.uid);
  }

  /**
   * 利用者投稿記事取得
   */
  @Get(':userId/articles')
  @UseGuards(AuthGuard('firebase-jwt'))
  @UseInterceptors(fetchUsersArticlesInterceptor)
  fetchUsersArticles(
    @Param('userId') userId: string,
    @Request() req,
  ): Promise<User> {
    return this.userService.fetchUsersArticles(req.user.uid);
  }
}
