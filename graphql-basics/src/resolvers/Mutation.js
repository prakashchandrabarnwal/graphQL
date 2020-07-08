const uuid = require("uuid");

const Mutation = {
  createComment(parent, args, { db }, info) {
    const { author, post } = args.data;
    const userExist = db.users.some(({ id }) => author == id);
    const postExist = db.posts.some(({ id, published }) => id === post && published)

    if (!userExist || !postExist) {
      throw new Error("unable to find user or post");
    }
    const comment = { id: uuid.v4(), ...args.data };
    db.comments.push(comment);
    return comment;
  },

  updatePost(parent, args, { db }, info) {
    const { id, data } = args;
    const post = db.posts.filter((post) => post.id === id);
    if (!post) {
      throw new Error("No Post Found");
    }

    if (typeof data.title === 'string') {
      post.title = data.title;
    }

    if (typeof data.body === 'string') {
      post.body = data.body;
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published;
    }

    return post;
  },

  updateComment(parent, args, { db }, info) {
    const { id, data } = args;
    const comment = db.comments.find(comment => comment.id === id);

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (typeof data.text === "string") {
      comment.text = data.text;
    }
    return comment;
  },

  createPost(parent, args, { db }, info) {
    const { author } = args.data;
    const userExist = db.users.some(({ id }) => author == id);
    if (!userExist) {

      throw new Error("User not found!");
    } else {
      const newPost = {
        id: uuid.v4(),
        ...args.data
      };
      db.posts.push(newPost);
      return newPost;
    }
  },

  updateUser(parent, args, { db }, info) {
    const user = db.users.find(({ id }) => id === args.id);
    if (!user) {
      throw new Error("User not found!");
    }
    if (typeof args.data.email == "string") {
      const emailExist = db.users.some(({ email }) => email === args.data.email);
      if (emailExist) {
        throw new Error("Email Taken");
      };
      user.email = args.data.email;
    }

    if (typeof args.data.name === 'string') {
      user.name = args.data.name;
    }

    if (typeof args.data.age !== 'undefined') {
      user.age = args.data.age
    }

    return user;
  },

  createUser(parent, args, { db }, info) {
    const emailExist = db.users.some(({ email }) => email === args.data.email);
    if (emailExist) {
      throw new Error("User Exist with provided Email");
    } else {
      const newUser = {
        id: uuid.v4(),
        ...args.data
      };
      db.users.push(newUser);
      return newUser;
    }
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => user.id === args.id);
    if (userIndex === -1) {
      throw new Error("User not found");
    } else {
      const deletedUsers = db.users.splice(userIndex, 1);
      posts = db.posts.filter((post) => {
        const match = post.author === args.id;
        if (match) {
          comments = db.comments.filter((comment) => comment.post !== post.id);
        }
        return !match;
      });
      db.comments = db.comments.filter(comment => comment.author !== args.id);
      return deletedUsers[0];
    }
  },

  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex(post => post.id === args.id);
    if (postIndex === -1) {
      throw new Error("Post not found");
    }
    const deletePost = db.posts.splice(postIndex, 1);
    db.comments = db.comments.filter(comment => comment.post !== args.id)
    return deletePost[0];
  },

  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex(comment => comment.id == args.id)
    if (commentIndex == -1) {
      throw new Error("Comment not found");
    }
    const deleteComments = db.comments.splice(commentIndex, 1);
    return deleteComments[0];
  }
}

module.exports = Mutation