const Post = {
  author(parent, args, { db }, info) {
    if (!args) {
      return db.posts;
    }
    return db.users.find((user) => {
      return user.name === parent.author
    })
  },
  comments(parent, args, { db }, info) {
    return db.comments.filter((comment) =>
      comment.post === parent.id
    )
  }
}

module.exports = Post;