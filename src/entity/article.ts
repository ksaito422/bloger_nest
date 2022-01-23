import {
  Column,
  Entity,
  PrimaryColumn,
  ManyToOne,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/entity/user';

@Entity()
export class Article {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  readonly user?: User;

  @Column()
  title: string;

  @Column()
  content: string;

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
