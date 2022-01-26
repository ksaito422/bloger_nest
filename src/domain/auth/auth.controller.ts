import {
  Controller,
  Post,
  Body,
  Param,
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
  @Post()
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
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
  @Delete(':id')
  unregister(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
