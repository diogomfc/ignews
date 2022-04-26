import {Client} from 'faunadb'

 //faunadb

  export const faunaClient = new Client({
    secret: process.env.FAUNADB_KEY,
    domain: "db.us.fauna.com",
  })
