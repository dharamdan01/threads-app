import express from "express";
import {expressMiddleware} from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql/index.js";
import UserService from "./services/user.js";
import { Token } from "graphql";

async function init()
{
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json())


  app.get("/", (req, res) => {
    res.json({message: "Server is up and running"});
  })

  const gqlServer = await createApolloGraphqlServer();
  app.use("/graphql", expressMiddleware(gqlServer, {
    context: async ({ req }) => {
      // @ts-ignore
      const token = req.headers["token"];
      // console.log(token);
      try{
        const user = UserService.decodeJWTTOKEN(token as string);
        return {user};
      }
      catch(error)
      {
        // @ts-ignore 
        console.log('Error: ', error.message);
        return {error};
      }
    },
  }),)

  app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
}

init();
function async(_: any, arg1: { firstName: any; lastName: any; email: any; password: any; }, arg2: { firstName: StringConstructor; lastName: StringConstructor; email: StringConstructor; password: StringConstructor; }): unknown | import("@graphql-tools/utils").IFieldResolver<any, import("@apollo/server").BaseContext, any, any> | import("@graphql-tools/utils").IFieldResolverOptions<any, import("@apollo/server").BaseContext, any> {
  throw new Error("Function not implemented.");
}

