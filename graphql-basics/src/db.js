const comments = [
  {
    id: "c1",
    text: "This worked well for me. Thanks",
    author: "u1",
    post: "p1",
  },
  {
    id: "c2",
    text: "Glas you enjoyed it.",
    author: "u2",
    post: "p2",
  },
  {
    id: "c3",
    text: "This did not work",
    author: "u3",
    post: "p1",
  },
  {
    id: "c4",
    text: "Nevermind",
    author: "u1",
    post: "p1",
  }
];

const posts = [
  {
    id: "p1",
    title: "title1",
    body: "body1",
    published: true,
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

const db = {
  users,
  posts,
  comments
};


module.exports = db;