import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mmasEightApi = createApi({
  reducerPath: 'mmasEightApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/mmas-8`
  }),
  endpoints: (builder) => ({
    getAllMmasEight: builder.query({
      query: () => 'fetchAll'
    }),
    addMmasEight: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getMmasEight: builder.query({
      query: (id) => `detail/${id}`
    }),
    getMmasEightByPatientID: builder.query({
      query: (id) => `details/${id}`
    }),
    deleteMmasEight: builder.mutation({
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
  useGetAllMmasEightQuery, useAddMmasEightMutation, useGetMmasEightByPatientIDQuery,
  useGetMmasEightQuery,
  useDeleteMmasEightMutation
} = mmasEightApi
