import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userTypeApi = createApi({
  reducerPath: 'userTypeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/viral-load'
  }),
  endpoints: (builder) => ({
    getUserTypes: builder.query({
      query: () => 'fetchAll'
    }),
    addUserType: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getUserType: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateUserType: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteUserType: builder.mutation({
      query (id) {
        return {
          url: `delete${id}`,
          method: 'DELETE'
        }
      }
    })
  })
})

export const {
  useGetUserTypesQuery,
  useAddUserTypeMutation, useGetUserTypeQuery
} = userTypeApi
