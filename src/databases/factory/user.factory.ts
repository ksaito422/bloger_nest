import { define } from 'typeorm-seeding';
import { User } from 'src/entities/user';
import * as Faker from 'faker/locale/ja';

define(User, (faker: Faker) => {
  const user = new User();
  user.id = faker.random.uuid();
  user.name = faker.internet.userName();

  return user;
});
