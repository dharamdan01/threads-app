import { ApolloServer } from "@apollo/server";
import { User } from "./user/index.js";
async function createApolloGraphqlServer() {
    // create Graphql Server
    const gqlServer = new ApolloServer({
        typeDefs: `
          ${User.typeDefs}
           type Query {
             ${User.Queries}
          #   getContext: String
           }

          type Mutation{
            ${User.mutation}
          }
  
        `, // Schema
        resolvers: {
            Query: {
                ...User.resolvers.Queries,
                // getContext: (_:any, parameters:any, context) => {
                //   return 'okay';
                // }
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