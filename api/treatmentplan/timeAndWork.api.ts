import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const timeAndWorkApi = createApi({
  reducerPath: 'timeAndWorkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/root-service/time-and-work'
  }),
  endpoints: (builder) => ({
    getAllTimeAndWork: builder.query({
      query: () => 'fetchAll'
    }),

    addTimeAndWork: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getTimeAndWork: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateTimeAndWork: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteTimeAndWork: builder.mutation({
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
  useGetAllTimeAndWorkQuery, useAddTimeAndWorkMutation,
  useGetTimeAndWorkQuery
} = timeAndWorkApi
