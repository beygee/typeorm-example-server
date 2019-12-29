import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { User } from './User'

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @CreateDateColumn()
  createdAt: Date

  @Column({ type: Date, default: null, nullable: true })
  deletedAt: Date | null

  @ManyToOne(
    type => User,
    user => user.posts,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn()
  user: User
}
