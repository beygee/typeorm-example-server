import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema, Field, ObjectType, Query, Resolver } from "type-graphql";

@ObjectType()
class Author {
  @Field()
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

@ObjectType()
class Book {
  @Field()
  title: string;

  @Field(type => Author)
  authors: Author[] = [];

  @Field()
  year: number;

  @Field({
    nullable: true
  })
  subTitle?: string;

  constructor(title: string, name: string, year: number, subTitle?: string) {
    this.title = title;
    this.year = year;
    this.authors.push(new Author(name));

    if (subTitle) {
      this.subTitle = subTitle;
    }
  }
}

const books: Book[] = [
  new Book("토지", "박경리", 1969),
  new Book("무정", "이광수", 1917)
];

@Resolver()
class BookResolver {
  @Query(() => [Book])
  async books(): Promise<Book[]> {
    return books;
  }
}

async function main() {
  const schema = await buildSchema({ resolvers: [BookResolver] });

  const server = new ApolloServer({ schema, playground: true });

  const { url } = await server.listen();

  console.log(`Server is running : ${url}`);
}

main()
