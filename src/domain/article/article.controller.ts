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
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { verifyIdToken } from 'src/common/util/verifyIdToken';
import { Article } from './interface/article.interface';
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

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  /**
   * 記事詳細取得
   */
  @Get(':articleId')
  @UseInterceptors(ArticleFindOneInterceptor)
  findOne(@Param('articleId') articleId: string, @Headers() headers: Headers) {
    verifyIdToken(headers);
    return this.articleService.findOne(articleId);
  }

  @Patch(':articleId')
  update(
    @Param('articleId') articleId: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(articleId, updateArticleDto);
  }

  @Delete(':articleId')
  remove(@Param('articleId') articleId: string) {
    return this.articleService.remove(articleId);
  }
}
