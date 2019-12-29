import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { User } from './entity/User'
import { Profile } from './entity/Profile'
import { Post } from './entity/Post'

createConnection()
  .then(async connection => {
    console.log(`Inserting a new user into the database...`)

    const profile = await Profile.create({ name: 'kim', age: 22 }).save()

    const user = await User.create({
      email: 'tester@mail.com',
      password: 'password',
      profile
    }).save()

    const post = await Post.create({
      title: '제목',
      content: '내용',
      user
    }).save()

    console.log(await Post.find({ relations: ['user', 'user.profile'] }))
    await user.remove()

    console.log(await Post.find())
    console.log(await Profile.find())

    // const profile = await Profile.create({
    //   name: "John",
    //   age: 22
    // }).save();

    // const user = await User.create({
    //   email: "test1311@mail.com",
    //   password: "pass",
    //   profile: profile
    // }).save();

    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);

    // const users = await connection.manager.find(User);
    // console.log(`Loaded Users: ${users}`);
    // console.log(await User.find({ relations: ['profile'] }))

    await connection.close()
  })
  .catch(console.error)
