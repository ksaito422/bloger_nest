import { Factory, Seeder } from 'typeorm-seeding';
import { getRepository } from 'typeorm';
import { Article } from 'src/entities/article';
import { User } from 'src/entities/user';

export default class CreateArticles implements Seeder {
  public async run(factory: Factory) {
    // user tableからデータを取得
    const userRepository = getRepository(User);
    const user = await userRepository.findOne();

    // ランダムデータ生成
    await factory(Article)({
      userId: user.id,
    }).createMany(3);
  }
}
