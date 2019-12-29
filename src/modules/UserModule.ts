import * as bcrypt from 'bcrypt'
import { Profile } from '../entity/Profile'
import { User } from '../entity/User'
import { IsNull } from 'typeorm'

export class UserModule {
  public static async register(
    email: string,
    password: string,
    name: string,
    age: number,
    imageUrl: string
  ): Promise<User> {
    const profile = new Profile()
    profile.name = name
    profile.age = age
    profile.imageUrl = imageUrl
    await profile.save()

    const user = new User()
    user.email = email
    user.password = await bcrypt.hash(password, 10)
    user.profile = profile

    return await user.save()
  }

  public static async login(
    email: string,
    password: string
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email, deletedAt: IsNull() } })

    if (!user) return null

    if (!(await bcrypt.compare(password, user.password))) return null

    return user
  }

  public static async list(): Promise<User[]> {
    return await User.find({
      where: { deletedAt: IsNull() },
      relations: ['profile'],
      order: { id: 'DESC' }
    })
  }
}
