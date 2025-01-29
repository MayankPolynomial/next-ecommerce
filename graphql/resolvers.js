import { User } from "./models/User.js";
import { Post } from "./models/Post.js";

export const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find(); 
    },
    getUser: async (_, { id }) => {
      const user = await User.findById(id).populate("posts");
      return user;
    },
    getPosts: async () => {
      return await Post.find().populate("authorId"); 
    },
    getPost: async (_, { id }) => {
      return await Post.findById(id).populate("author");
    },
  },
  Mutation: {
    addUser: async (_, { name, email, password }) => {
      const newUser = new User({ name, email, password });
      return await newUser.save(); 
    },
    addPost: async (_, { title, content, authorId }) => {
      const newPost = new Post({ title, content, authorId });
      await newPost.save();
      return newPost;
    },
    updateUser: async (_, { id, name, email, password }) => {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, password },
        { new: true }
      );
      return updatedUser;
    },
    updatePost: async (_, { id, title, content }) => {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
      );
      return updatedPost;
    },
    deleteUser: async (_, { id }) => {
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      await Post.deleteMany({ author: id });
      await User.findByIdAndDelete(id);
      return { message: "User deleted successfully" };
    },

    deletePost: async (_, { id }) => {
      const post = await Post.findById(id);
      if (!post) {
        throw new Error("Post not found");
      }
      await Post.findByIdAndDelete(id);
      return { message: "Post deleted successfully" };
    }
  }  
};
