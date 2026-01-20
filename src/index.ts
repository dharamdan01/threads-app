import express from "express";
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import {prismaClient} from "./lib/db.js";

async function init()
{
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json())

  // create Graphql Server
  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query{
        hello: String
        say(name: String): String
      }

      type Mutation {
        createUser(firstName:  String!, lastName: String!, email: String!, password: String!): Boolean
      }
    `, // Schema

    resolvers: {
      Query: {
        hello: () => `Hey there, Iam using graphql server`,
        say: (_, {name}: {name: String}) => `Hey ${name}, How are you`
      },

      Mutation: {
        createUser: async (_, {firstName, lastName, email, password}:{firstName: string; lastName: string; email: string; password: string}) => {
        await prismaClient.user.create({data: {firstName, lastName, email, password,}});
        return true;
      }
    }
    }
  });

  // start the gql server
  await gqlServer.start()

  app.get("/", (req, res) => {
    res.json({message: "Server is up and running"});
  })

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
}

init();
function async(_: any, arg1: { firstName: any; lastName: any; email: any; password: any; }, arg2: { firstName: StringConstructor; lastName: StringConstructor; email: StringConstructor; password: StringConstructor; }): unknown | import("@graphql-tools/utils").IFieldResolver<any, import("@apollo/server").BaseContext, any, any> | import("@graphql-tools/utils").IFieldResolverOptions<any, import("@apollo/server").BaseContext, any> {
  throw new Error("Function not implemented.");
}

