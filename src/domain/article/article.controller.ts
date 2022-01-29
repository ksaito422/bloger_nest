import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { verifyIdToken } from 'src/common/util/verifyIdToken';
import { Article } from 'src/entity/article';
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
  @HttpCode(HttpStatus.CREATED)
  create(
    @Headers() headers: Headers,
    @Param('userId') userId: string,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    verifyIdToken(headers);
    this.articleService.create(createArticleDto, userId);

    return null;
  }

  /**
   * 記事詳細取得
   */
  @Get(':articleId')
  @UseInterceptors(ArticleFindOneInterceptor)
  findOne(
    @Param('articleId') articleId: string,
    @Headers() headers: Headers,
  ): Promise<Article> {
    verifyIdToken(headers);
    return this.articleService.findOne(articleId);
  }

  /**
   * 記事編集
   */
  @Patch(':articleId')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Headers() headers: Headers,
    @Param('articleId') articleId: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    verifyIdToken(headers);
    this.articleService.update(articleId, updateArticleDto);

    return null;
  }

  /**
   * 記事削除
   */
  @Delete(':articleId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Headers() headers: Headers, @Param('articleId') articleId: string) {
    verifyIdToken(headers);

    return this.articleService.remove(articleId);
  }
}
