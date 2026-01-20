import { ApolloServer } from "@apollo/server";
import { User } from "./user/index.js";
async function createApolloGraphqlServer() {
    // create Graphql Server
    const gqlServer = new ApolloServer({
        typeDefs: `
          type Query {
            ${User.Queries}
          }

          type Mutation{
            ${User.mutation}
          }
  
        `, // Schema
        resolvers: {
            Query: {
                ...User.resolvers.Queries
            },
            Mutation: {
                ...User.resolvers.mutations
            }
        }
    });
    // start the gql server
    await gqlServer.start();
    return gqlServer;
}
export default createApolloGraphqlServer;
//# sourceMappingURL=index.js.map