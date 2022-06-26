const { ApolloServer,gql } = require('apollo-server')

const typeDefs = gql`
scalar Date

"""
 An Object that describes the Ski day
"""
type SkiDay{
    "Ski Day unique identifier"
    id: ID!
    date: Date!
    mountain: String!
    condtions: Conditions
}

enum Conditions {
    POWER
    HEAVY
    ICE
    THIN
}
 type Query{
     totalDays: Int!
     allDays: [SkiDay!]!
 }

 type RemoveDayPayLoad {
    day: SkiDay!
    removed: Boolean
    totalBefore: Int
    totalAfter: Int
 }

 input AddDayInput {
     date: Date!
     mountain: String!
     conditions: Conditions
 }


 type Mutation {
     addDay(input: AddDayInput!): SkiDay
     removeDay(id:ID!): RemoveDayPayLoad!
 }
`;

const mocks ={
    Date: () => "1/2/2025"
}
const server = new ApolloServer({
    typeDefs,
    mocks
});

server.listen().then(({url}) => console.log(`Server running at ${url}`));