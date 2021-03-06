const { gql } = require('apollo-server-express')
const { fetch } = require('../src/db/util.js')

const typeDefs = gql`
    type Grade {
        id: String
        rating: String
    }
    type Finish {
        id: String
        type: String
    }
    type Gyms {
        id: String
        name: String
        address: String
        city: String
        state: String
        zip: String
    }
    type RouteType {
        id: String
        type: String
    }
    type RouteTypeGrades {
        id: String
        type: String
    }
    type Routes {
        id: String
        finishId: String
        gradeId: String
        routeTypeId: String
    }
    type SessionRoutes {
        id: String
        routeId: String
        sessionId: String
    }
    type Sessions {
        id: String
        date: String
        userId: String
        gymId: String
    }
    type Users {
        id: String
        name: String
        email: String
        address: String
        city: String
        state: String
        zip: String
    }
    type Query {
        grades: [Grade]
        routes: [Routes]
        sessions: [Sessions]
        users: [Users]
        finish: [Finish]
    }
`

const resolvers = {
    Query: {
        grades: fetch,
        routes: fetch,
        sessions: fetch,
        users: fetch,
        finish: fetch
    }
}

module.exports = {
    typeDefs,
    resolvers
}