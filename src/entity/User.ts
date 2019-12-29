import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  OneToOne,
  OneToMany,
  ManyToMany
} from 'typeorm'
import { Profile } from './Profile'
import { Post } from './Post'
import { Group } from './Group'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @CreateDateColumn()
  createdAt: Date

  @Column({ type: Date, nullable: true, default: null })
  deletedAt: Date | null

  @OneToOne(
    type => Profile,
    profile => profile.user
  )
  profile: Profile

  @OneToMany(
    type => Post,
    post => post.user
  )
  posts: Post[]

  @ManyToMany(
    type => Group,
    group => group.users
  )
  groups: Group[]
}
