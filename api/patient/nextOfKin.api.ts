/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Post {
  id: number
  name: string
}

type PostsResponse = Post[]

export const nextOfKinApi = createApi({
  reducerPath: 'nextOfKinApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/users/next-of-kin`
    // prepareHeaders (headers, { getState }) {
    //   // Add your custom headers here
    //   if (process.env.NEXT_PUBLIC_API_URL !== undefined) {
    //     headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_API_URL)
    //     return headers
    //   }
    // }
  }),
  endpoints: (builder) => ({
    getAllNextOfKins: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addNextOfKin: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getNextOfKin: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateNextOfKin: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteNextOfKin: builder.mutation({
      query (id) {
        return {
          url: `delete/${id}`,
          method: 'DELETE'
        }
      }
    })
  })
})

export const {
  useGetAllNextOfKinsQuery, useUpdateNextOfKinMutation,
  useDeleteNextOfKinMutation, useAddNextOfKinMutation, useGetNextOfKinQuery
} = nextOfKinApi
