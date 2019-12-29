import * as TypeORM from 'typeorm'

let db: TypeORM.Connection


beforeAll(async () => {
  try {
    this.db = await TypeORM.createConnection()
  } catch (e) {
    console.error(e)
  }
})

afterAll(async () => {
  try {
    await this.db.close()
  } catch (e) {
    console.error(e)
  }
})
