import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/article';
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

  create(createArticleDto: CreateArticleDto, userId: string) {
    return this.articleRepository.save({
      user_id: userId,
      title: createArticleDto.title,
      content: createArticleDto.content,
    });
  }

  findOne(articleId: string) {
    return this.articleRepository.findOneOrFail(articleId);
  }

  update(articleId: string, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.update(articleId, updateArticleDto);
  }

  remove(articleId: string) {
    return this.articleRepository.softDelete(articleId);
  }
}
