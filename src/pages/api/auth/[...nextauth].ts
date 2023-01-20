import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { query as q } from "faunadb";

//faunaDB
import { faunaClient } from "../../../services/fauna";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
    // ...add more providers here
  ],
  
 callbacks: {
     async signIn({ user, account, profile, credentials }) {
       //console.log(profile);

       const { email } = user

        //inserir no banco de dados faunadb
       try{
         await faunaClient.query(
           q.If(
             q.Not(
               q.Exists(
                 q.Match(
                   q.Index('user_by_email'),
                   q.Casefold(user.email)
                 )
               )
             ),
             q.Create(
               q.Collection('users'),
               {
                 data: {
                   email,
                   name: profile.name,
                   avatar: profile.image,
                 },
               }
             ),
             q.Get(
               q.Match(
                 q.Index('user_by_email'),
                 q.Casefold(user.email)
               )
             )
           )
         )
         return true
       } catch {
         return false
       }


     },
   },
  
})


// FaunaDB - HTTP
// DynamoDB - AWS


