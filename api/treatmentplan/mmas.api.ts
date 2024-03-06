import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mmasApi = createApi({
  reducerPath: 'mmasApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/mmas'
  }),
  endpoints: (builder) => ({
    getAllMmas: builder.query({
      query: () => 'fetchAll'
    }),
    addMmas: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getMmas: builder.query({
      query: (id) => `detail/${id}`
    }),

    deleteMmas: builder.mutation({
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
  useGetAllMmasQuery, useAddMmasMutation,
  useGetMmasQuery,
  useDeleteMmasMutation
} = mmasApi
