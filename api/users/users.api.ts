/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface UserProps {
  firstName: string
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/users/users`
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    login: builder.mutation({
      query: (email) => `login/${email}`
    }),
    getUser: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteUser: builder.mutation({
      query (id) {
        return {
          url: `delete${id}`,
          method: 'DELETE'
        }
      }
    })
  })
})

export const { useGetAllUsersQuery, useAddUserMutation, useGetUserQuery, useLoginMutation } = userApi
