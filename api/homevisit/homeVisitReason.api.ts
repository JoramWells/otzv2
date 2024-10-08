/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const homeVisitReasonApi = createApi({
  reducerPath: 'homeVisitReasonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/home-visit-reason`
  }),
  endpoints: (builder) => ({
    getHomeVisitReasons: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addHomeVisitReason: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getHomeVisitReason: builder.query({
      query: (id) => `details/${id}`
    }),
    updateHomeVisitReason: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteHomeVisitReason: builder.mutation({
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
  useGetHomeVisitReasonsQuery, useAddHomeVisitReasonMutation,
  useGetHomeVisitReasonQuery
} = homeVisitReasonApi
