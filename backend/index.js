const express = require('express');
const colors = require('colors');
const cors = require('cors')
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schemaFile = require('./schema/schemaFile');
const connectDB = require('./config/db');

const port = process.env.PORT || 5000
const app = express()

// Connect DB
connectDB()

// CORS middleware
app.use(cors())

// GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schemaFile,
    graphiql: process.env.NODE_ENV === "development" // true
  })
)

app.listen(port, console.log(`server running on port ${port}`))



// travesymediamern
// shggv26Pq2FNKXuf
// mongodb + srv://travesymediamern:shggv26Pq2FNKXuf@cluster0.ap8fxt2.mongodb.net/test