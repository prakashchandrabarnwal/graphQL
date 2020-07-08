const Query = {
  posts(parent, args, { db }, info) {
    const { query } = args;
    if (!query) {
      return db.posts;
    } else {
      return db.posts.filter(({ body, title }) => (title.toLowerCase().includes(query.toLowerCase()) || body.toLowerCase().includes(query.toLowerCase())))
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
  users(parent, args, { db }, info) {
    const { query } = args;
    if (!query) {
      return db.users;
    }
    else {
      return db.users.filter(({ name }) => {
        return name.toLowerCase().includes(query.toLowerCase());
      })
    }
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  }
}

module.exports = Query