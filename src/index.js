import { GraphQLServer, PubSub } from 'graphql-yoga'

import db from './db'
import Query from './Resolvers/Query'
import Mutation from './Resolvers/Mutation'
import Subscription from './Resolvers/subscription'
import User from './Resolvers/User'
import Post from './Resolvers/Post'
import Comment from './Resolvers/Comment'
import prisma from './prisma'

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        Post,
        User,
        Comment
    },
    context(request) {
       return{
        db,
        pubsub,
        prisma,
        request
       } 
    }
})

server.start(() => {
    console.log('surver is running')
})