import { GraphQLServer, PubSub } from "graphql-yoga";

import Query from "./resolvers/Query";
import Author from "./resolvers/Author";
import Book from "./resolvers/Book";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import { PrismaClient } from "@prisma/client";

import db from "./db";

const prisma = new PrismaClient();

const pubSub = new PubSub();

const resolvers = {
  Query,
  Author,
  Book,
  Mutation,
  Subscription,
};

const context = {
  db,
  pubSub,
  prisma,
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context,
});

server.start(() => console.log("Server is running on localhost:4000"));
