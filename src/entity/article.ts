import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { IArticle } from 'src/domain/article/interface/article.interface';
import { User } from 'src/entity/user';

@Entity()
export class Article implements IArticle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  readonly user?: User;

  @Column()
  title: string;

  @Column()
  content: string;

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
