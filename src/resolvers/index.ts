import { LoginResolver } from './user/LoginResolver'
import { RegisterResolver } from './user/RegisterResolver'
import { HelloResolver } from './hello/HelloResolver'

const resolvers = [HelloResolver, RegisterResolver, LoginResolver]

export default resolvers
