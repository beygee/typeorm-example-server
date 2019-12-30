import { Authorized, Ctx, Query, Resolver } from 'type-graphql'

@Resolver()
export class HelloResolver {
  @Query(type => String)
  public async hello(): Promise<string> {
    return 'world ' + new Date().getTime()
  }
}
