import express from "express"; 
import dotenv from "dotenv"; 
import { ApolloServer } from "@apollo/server";
import { connectDb } from "./config/db.js";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";

dotenv.config({path: "./.env"});
const mongoURI = process.env.URI;
connectDb(mongoURI);

const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers
});

app.use(cors());
app.use(express.json());

await server.start();
app.use("/graphql", expressMiddleware(server));

const PORT = process.env.PORT ? process.env.PORT : 4000;
app.listen(PORT, ()=>{
   console.log(`Server is running at http://localhost:${PORT}/graphql`);
})

