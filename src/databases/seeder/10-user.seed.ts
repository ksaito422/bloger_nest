import { Factory, Seeder } from 'typeorm-seeding';
import { User } from 'src/entities/user';
import { Connection } from 'typeorm';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection) {
    // 固定データのインサート
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ id: '4865RDsJqzWtMR8qazrSW6k6i4T2', name: 'saito' }])
      .execute();

    // ランダムデータ生成
    await factory(User)().createMany(3);
  }
}
