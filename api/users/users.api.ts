import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/users'
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'fetchAll'
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
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

export const { useGetUsersQuery, useAddUserMutation, useGetUserQuery } = userApi
