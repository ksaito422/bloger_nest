import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  findAll() {
    return `This action returns all article`;
  }

  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  findOne(articleId: string) {
    return `This action returns a #${articleId} article`;
  }

  update(articleId: string, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${articleId} article`;
  }

  remove(articleId: string) {
    return `This action removes a #${articleId} article`;
  }
}
