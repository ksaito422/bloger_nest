import {
  Controller,
  Post,
  Body,
  Delete,
  UseGuards,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserFindInterceptor } from './interceptor/user.find.interceptor';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 新規登録
   */
  @Post('register')
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @UseGuards(AuthGuard('firebase-jwt'))
  async register(@Body() createAuthDto: CreateAuthDto, @Request() req) {
    await this.authService.createUser(req.user.uid, createAuthDto);

    return { id: req.user.uid, name: createAuthDto.name };
  }

  /**
   * ログイン
   */
  @Post('login')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('firebase-jwt'))
  @UseInterceptors(UserFindInterceptor)
  async login(@Request() req) {
    return await this.authService.findUser(req.user.uid);
  }

  /**
   * 退会
   */
  @Delete('unregister')
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('firebase-jwt'))
  async unregister(@Request() req) {
    await this.authService.delete(req.user.uid);

    return null;
  }
}
