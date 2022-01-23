import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // 全記事取得
  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get(':articleId')
  findOne(@Param('articleId') articleId: string) {
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
