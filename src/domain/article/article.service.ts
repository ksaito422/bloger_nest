import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entity/article';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  findAll() {
    return this.articleRepository.find();
  }

  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  findOne(articleId: string) {
    return this.articleRepository.findOneOrFail(articleId);
  }

  update(articleId: string, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${articleId} article`;
  }

  remove(articleId: string) {
    return `This action removes a #${articleId} article`;
  }
}
