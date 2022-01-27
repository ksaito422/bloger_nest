import {
  Column,
  Entity,
  PrimaryColumn,
  OneToMany,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from 'src/entity/article';

@Entity()
export class User {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @OneToMany(() => Article, (articles) => articles.user)
  articles: Article[];

  @Column()
  name: string;

  @DeleteDateColumn({
    type: 'timestamp',
    precision: 0,
  })
  deletedAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  readonly createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  readonly updatedAt: Date;
}
