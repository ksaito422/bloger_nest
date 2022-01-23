import { define } from 'typeorm-seeding';
import { Article } from 'src/entity/article';
import * as Faker from 'faker/locale/ja';

interface Context {
  userId: string;
}

define(Article, (faker: Faker, context: Context) => {
  // seederからDBに存在するuserIdを受け取る
  const { userId } = context;

  const article = new Article();
  article.id = faker.random.uuid();
  article.title = faker.lorem.word();
  article.content = faker.lorem.word();
  article.user_id = userId;

  return article;
});
