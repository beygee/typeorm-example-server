import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import db from './utils/db'
import resolvers from './resolvers'

async function main() {
  try {
    await db()

    const schema = await buildSchema({ resolvers: resolvers })

    const server = new ApolloServer({ schema, playground: true })

    const { url } = await server.listen()

    console.log(`Server is running : ${url}`)
  } catch (e) {
    console.error(e)
  }
}

main()
