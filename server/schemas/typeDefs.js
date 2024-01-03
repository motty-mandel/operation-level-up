const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
}

type Auth {
    token: ID
    user: User
}

type Query {
    user: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
}
`;
 
module.exports = typeDefs;