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
import { ArticleService } from './article.service';
import { Article } from 'src/entities/article';
import { AuthGuard } from '@nestjs/passport';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleFindAllInterceptor } from './interceptor/article.findAll.interceptor';
import { ArticleFindOneInterceptor } from './interceptor/article.findOne.interceptor';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  /**
   * 全記事取得
   */
  @Get()
  @UseInterceptors(ArticleFindAllInterceptor)
  findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  /**
   * 記事投稿
   */
  @Post(':userId')
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
  @UseGuards(AuthGuard('firebase-jwt'))
  @UseInterceptors(ArticleFindOneInterceptor)
  findOne(@Param('articleId') articleId: string): Promise<Article> {
    return this.articleService.findOne(articleId);
  }

  /**
   * 記事編集
   */
  @Patch(':articleId')
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
  @UseGuards(AuthGuard('firebase-jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('articleId') articleId: string) {
    return this.articleService.remove(articleId);
  }
}
