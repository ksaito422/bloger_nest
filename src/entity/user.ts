import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from 'src/entity/article';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @OneToMany(() => Article, (article) => article.user_id)
  id: string;

  @Column()
  name: string;

  @DeleteDateColumn({
    type: 'timestamp',
    precision: 0,
    onUpdate: 'CURRENT_TIMESTAMP',
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
