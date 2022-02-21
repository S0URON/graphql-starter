import { gql } from 'apollo-server-express';

const typeDefs = gql`

    schema {
        query: Query
        mutation: Mutation
    }

    type Query {
        getUser: User!
    }

    type Mutation {
        createUser(input: CreateUserInput!): Message!
        signIn(input:SignInInput!):Token!
        updateUser(input:UpdateUserInput):Message!
        deleteUser(input:DeleteUserInput!):Message!
    }

    input CreateUserInput {
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        role: Role!
    }

    input SignInInput {
        email: String!
        password: String!
    }

    input UpdateUserInput {
        email: String
        firstName: String
        lastName: String
    }

    input DeleteUserInput {
        userId:String!
    }

    type User {
        email: String!
        firstName: String!
        lastName: String!
        role: String!
    }
    type Token {
        token: String!
    }
    type Message {
        message: String!
    }

    enum Role {
        ADMIN
        USER
    }
`;
module.exports = typeDefs;
