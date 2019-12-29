import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
  JoinTable
} from 'typeorm'
import { User } from './User'

@Entity()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(
    type => User,
    user => user.groups,
    { onDelete: 'CASCADE' }
  )
  @JoinTable()
  users: User[]
}
