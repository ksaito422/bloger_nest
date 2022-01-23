import { Factory, Seeder } from 'typeorm-seeding';
import { User } from 'src/entity/user';
import { Connection } from 'typeorm';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection) {
    // 固定データのインサート
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ id: '4c823795-70ea-4737-b5ed-d107c7a1e17e', name: 'saito' }])
      .execute();

    // ランダムデータ生成
    await factory(User)().createMany(3);
  }
}
