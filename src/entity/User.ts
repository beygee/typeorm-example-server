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
import { ObjectType, Field, Int } from 'type-graphql'

@ObjectType({ description: '사용자 계정' })
@Entity()
export class User extends BaseEntity {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ unique: true })
  email: string

  @Field()
  @Column({ unique: true })
  nickname: string

  @Column()
  password: string

  @Field()
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
