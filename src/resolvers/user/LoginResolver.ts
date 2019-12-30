import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ObjectType, Field, Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../../entity/User'
import { LoginInput } from './LoginInput'
import config from '../../config'

@ObjectType()
class LoginResponse extends User {
  @Field()
  public token: string
}

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  public async login(
    @Arg('data') loginInput: LoginInput
  ): Promise<LoginResponse> {
    const user = (await User.findOne({
      where: { email: loginInput.email }
    })) as LoginResponse

    if (!user) throw new Error('아이디와 암호를 확인해주세요')

    const valid = await bcrypt.compare(loginInput.password, user.password)

    if (!valid) throw new Error('아이디와 암호를 확인해주세요')

    user.token = this.makeToken(user.id, user.email, user.nickname)

    return user
  }

  private makeToken(id: number, email: string, nickname: string): string {
    return jwt.sign({ id, email, nickname }, config.jwtSecret, {
      expiresIn: '30d'
    })
  }
}
