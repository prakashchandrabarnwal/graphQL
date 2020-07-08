const { GraphQLServer } = require('graphql-yoga');

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Post = require("./resolvers/Post");
const Comment = require("./resolvers/Comment");

const db = require("./db");

// web end user <=> (  graphQl(1 call, i.e post query call)     <=>        server(get,post,upserts) / db )

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment
  },
  context: {
    db
  }
});

server.start(() => {
  console.log("started");
})