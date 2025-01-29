import { gql } from "apollo-server-express";


export const typeDefs =  gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    posts: [Post]
  }
  type Post {
    _id: ID!
    title: String!
    content: String!
    authorId: User
  }

  type Query {
    getUsers: [User]    
    getUser(id: ID!): User 
    getPosts: [Post]      
    getPost(id: ID!): Post 
  }

  type Message {
    message: String!
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): User
    addPost(title: String!, content: String!, authorId: ID!): Post
    updateUser(id: ID!, name: String, email: String, password: String): User
    updatePost(id: ID!, title: String, content: String): Post
    deleteUser(id: ID!): Message
    deletePost(id: ID!): Message
  }
`;
