import bcrypt from 'bcrypt'
import { Arg, Mutation, Resolver } from 'type-graphql'
import { RegisterInput } from './RegisterInput'
import { User } from '../../entity/User'

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  public async register(
    @Arg('data')
    registerInput: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerInput.password, 10)

    const user = await User.create({
      ...registerInput,
      password: hashedPassword
    }).save()

    return user
  }
}
