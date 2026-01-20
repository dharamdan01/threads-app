import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql/index.js";
import UserService from "./services/user.js";
import { Token } from "graphql";
async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;
    app.use(express.json());
    app.get("/", (req, res) => {
        res.json({ message: "Server is up and running" });
    });
    const gqlServer = await createApolloGraphqlServer();
    app.use("/graphql", expressMiddleware(gqlServer, {
        context: async ({ req }) => {
            // @ts-ignore
            const token = req.headers["token"];
            // console.log(token);
            try {
                const user = UserService.decodeJWTTOKEN(token);
                return { user };
            }
            catch (error) {
                // @ts-ignore 
                console.log('Error: ', error.message);
                return { error };
            }
        },
    }));
    app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
}
init();
function async(_, arg1, arg2) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=index.js.map