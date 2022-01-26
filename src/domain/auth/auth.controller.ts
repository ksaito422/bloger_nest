import {
  Controller,
  Post,
  Body,
  Delete,
  Headers,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { verifyIdToken } from 'src/common/util/verifyIdToken';
import { UserFindInterceptor } from './interceptor/user.find.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 新規登録
   */
  @Post('register')
  async register(
    @Body() createAuthDto: CreateAuthDto,
    @Headers() headers: Headers,
  ) {
    const decodedToken = await verifyIdToken(headers);
    this.authService.createUser(decodedToken.uid, createAuthDto);

    return { id: decodedToken.uid, name: createAuthDto.name };
  }

  /**
   * ログイン
   */
  @Post('login')
  @HttpCode(200)
  @UseInterceptors(UserFindInterceptor)
  async login(@Headers() headers: Headers) {
    const decodedToken = await verifyIdToken(headers);
    return await this.authService.findUser(decodedToken.uid);
  }

  /**
   * 退会
   */
  @Delete('unregister')
  @HttpCode(204)
  async unregister(@Headers() headers: Headers) {
    const decodedToken = await verifyIdToken(headers);
    this.authService.delete(decodedToken.uid);

    return null;
  }
}
