import * as TypeORM from 'typeorm'

const db = async () => {
  try {
    await TypeORM.createConnection()
  } catch (e) {
    console.error(e)
  }
}

export default db
