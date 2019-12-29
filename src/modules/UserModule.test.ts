import * as faker from 'faker/locale/ko'
import { User } from '../entity/User'
import { UserModule } from './UserModule'

describe('User Modules tests', () => {
  let user: User
  let password: string

  test('사용자 추가', async () => {
    const email = faker.random.uuid() + faker.internet.email()
    const name = faker.name.lastName() + faker.name.firstName()
    const age = faker.random.number({ min: 12, max: 100 })
    const imageUrl = faker.image.imageUrl()

    password = faker.internet.password()
    user = await UserModule.register(email, password, name, age, imageUrl)
    expect(user).toHaveProperty('id')
    expect(user.id).not.toEqual(undefined)
  })

  test('로그인', async () => {
    const loginUser = await UserModule.login(user.email, password)
    expect(loginUser).not.toBeNull()
  })

  test('사용자 목록', async () => {
    const users = await UserModule.list()
    expect(users.length).toBeGreaterThan(0)
  })
})
