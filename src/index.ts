import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";

createConnection()
  .then(async connection => {
    console.log(`Inserting a new user into the database...`);

    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);

    const users = await connection.manager.find(User);
    console.log(`Loaded Users: ${users}`);
  })
  .catch(console.error);
