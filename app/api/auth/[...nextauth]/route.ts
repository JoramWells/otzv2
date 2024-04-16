/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

const handler = NextAuth({
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {}
      },
      async authorize (credentials, req) {
        console.log(credentials)
        const response = await axios.post('http://root:5000/users/login', {
          email: credentials?.email,
          password: credentials?.password
        })
        if (response) {
          return response.data
        }
        // .catch(err => { console.log(err) })
        return null
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.data = user
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token.data) {
        session.user = token.data
      }
      return session
    }
  },
  secret: process.env.NEXT_AUTH_SECRET
})

export { handler as GET, handler as POST }
