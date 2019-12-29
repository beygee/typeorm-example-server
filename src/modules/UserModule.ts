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

  public static async get(id: number): Promise<User> {
    return await User.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['profile']
    })
  }

  public static async profileUpdate(id: number, data: any): Promise<User> {
    const user = await User.findOne({ where: { id }, relations: ['profile'] })

    for (const key in data) {
      user.profile[key] = data[key]
    }

    user.profile = await user.profile.save()

    return user
  }

  public static async leave(id: number): Promise<User> {
    const user = await User.findOne(id)

    user.deletedAt = new Date()

    return await user.save()
  }

  public static async delete(id: number): Promise<User> {
    const user = await User.findOne(id, { relations: ['profile'] })
    return await user.remove()
    
  }
}
