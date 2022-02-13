import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { Article } from 'src/entities/article';
import { AuthGuard } from '@nestjs/passport';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleFindAllInterceptor } from './interceptor/article.findAll.interceptor';
import { ArticleFindOneInterceptor } from './interceptor/article.findOne.interceptor';
import {
  ArticleFindAllResponse,
  ArticleFindOneResponse,
} from 'src/domains/article/dto/response-article.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  /**
   * 全記事取得
   */
  @Get()
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [ArticleFindAllResponse],
  })
  @UseInterceptors(ArticleFindAllInterceptor)
  findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  /**
   * 記事投稿
   */
  @Post(':userId')
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('firebase-jwt'))
  @HttpCode(HttpStatus.CREATED)
  create(
    @Request() req,
    @Param('userId') userId: string,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    this.articleService.create(createArticleDto, req.user.uid);

    return null;
  }

  /**
   * 記事詳細取得
   */
  @Get(':articleId')
  @ApiResponse({ status: 200, description: 'OK', type: ArticleFindOneResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('firebase-jwt'))
  @UseInterceptors(ArticleFindOneInterceptor)
  findOne(@Param('articleId') articleId: string): Promise<Article> {
    return this.articleService.findOne(articleId);
  }

  /**
   * 記事編集
   */
  @Patch(':articleId')
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('firebase-jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('articleId') articleId: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    this.articleService.update(articleId, updateArticleDto);

    return null;
  }

  /**
   * 記事削除
   */
  @Delete(':articleId')
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('firebase-jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('articleId') articleId: string) {
    return this.articleService.remove(articleId);
  }
}
