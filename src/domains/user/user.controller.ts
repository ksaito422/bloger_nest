import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from 'src/entities/user';
import { UserFindInterceptor } from './interceptor/user.find.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { fetchUsersArticlesInterceptor } from './interceptor/fetchUsersArticles.interceptor';
import {
  UserFetchUserRes,
  UserFetchUsersArticlesRes,
} from 'src/swagger/user.swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 利用者情報取得
   */
  @Get(':userId')
  @ApiResponse({ status: 200, description: 'OK', type: UserFetchUserRes })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('firebase-jwt'))
  @UseInterceptors(UserFindInterceptor)
  fetchUser(@Param('userId') userId: string, @Request() req): Promise<User> {
    return this.userService.fetchUser(req.user.uid);
  }

  /**
   * 利用者投稿記事取得
   */
  @Get(':userId/articles')
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [UserFetchUsersArticlesRes],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('firebase-jwt'))
  @UseInterceptors(fetchUsersArticlesInterceptor)
  fetchUsersArticles(
    @Param('userId') userId: string,
    @Request() req,
  ): Promise<User> {
    return this.userService.fetchUsersArticles(req.user.uid);
  }
}
