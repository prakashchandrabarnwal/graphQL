const { GraphQLServer } = require('graphql-yoga');


// web end user <=> (  graphQl(1 call, i.e post query call)     <=>        server(get,post,upserts) / db )
// web , mobile

// dummy data
const users = [{
  id: "u1",
  name: "prakash",
  email: "prakash@gmail.com",
  age: 27
},
{
  id: "u2",
  name: "bikky",
  email: "bikky@gmail.com"
},
{
  id: "u3",
  name: "kajal",
  email: "kajal@gmail.com"
}
];

//dummy post data
const posts = [
  {
    id: "p1",
    title: "title1",
    body: "body1",
    published: false,
    author: "u1"
  },
  {
    id: "p2",
    title: "title2",
    body: "body2",
    published: true,
    author: "u2"
  },
  {
    id: "p3",
    title: "title3",
    body: "body3",
    published: true,
    author: "u3"
  }
]

const comments = [
  {
    id: "c1",
    text: "This worked well for me. Thanks",
    author: "u1"
  },
  {
    id: "c2",
    text: "Glas you enjoyed it.",
    author: "u2"
  },
  {
    id: "c3",
    text: "This did not work",
    author: "u3"
  },
  {
    id: "c4",
    text: "Nevermind",
    author: "u1"
  }
]

// Type Schema { String Boolean Int Float ID }
const typeDefs = `
  type Query {

    users(query :String) : [User!]!
    posts(query : String):[Post]!
    comments:[Comment!]!
    grades : [Int!]!
    greeting(name: String!,position: String!) : String!
    add(numbers:[Float]!): Float!
    me : User
    post : Post
  }

  type Comment {
    id: ID!
    text : String!
    author: User!
  }

  type  User {
    id : ID!
    name : String!
    email : String!
    age : Int
    posts: [Post!]!
    comments : [Comment!]!
  }

  type Post {
    id : ID!
    title : String!
    body : String!
    published : Boolean!
    author : User!
  }
`

// resolvers
const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      const { query } = args;
      if (!query) {
        return posts;
      } else {
        return posts.filter(({ body, title }) => (title.toLowerCase().includes(query.toLowerCase()) || body.toLowerCase().includes(query.toLowerCase())))
      }
    },

    grades(parents, args, ctx, info) {
      return [90, 80, 93];
    },
    add(parent, args, ctx, info) {
      const { numbers } = args;
      if (numbers.length) {
        return numbers.reduce((acc, current) => { return acc + current }, 0)
      } else {
        return 0;
      }
    },
    greeting(parent, args, ctx, info) {
      const { name, position } = args;
      return `Hello! ${name}, ${position}`;
    },
    me() {
      return ({
        id: "id",
        name: "prakash",
        email: "barnwalbikky@gmail.com",
      })
    },
    post() {
      return {
        id: "2014",
        title: "title",
        body: "body",
        published: false
      }
    },
    users(parent, args, ctx, info) {
      const { query } = args;
      if (!query) {
        return users;
      }
      else {
        return users.filter(({ name }) => {
          return name.toLowerCase().includes(query.toLowerCase());
        })
      }
    },
    comments(parent, args, ctx, info) {
      return comments;
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      const { id } = parent;
      return posts.filter(({ author }) => author === id);
    },
    comments(parent, args, ctx, info) {
      const { id } = parent;
      return comments.filter(({ author }) => id === author)
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(({ id }) => id === parent.author);
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(({ id }) => id === parent.author)
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("started");
})