import {
  Column,
  Entity,
  PrimaryColumn,
  OneToMany,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUser } from 'src/domains/user/interface/user.interface';
import { Article } from 'src/entities/article';

@Entity()
export class User implements IUser {
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
  deleted_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  readonly created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  readonly updated_at: Date;
}
