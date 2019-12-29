import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Profile } from "./entity/Profile";

createConnection()
  .then(async connection => {
    console.log(`Inserting a new user into the database...`);

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
    console.log(await User.find({ relations: ["profile"] }));

    await connection.close();
  })
  .catch(console.error);
