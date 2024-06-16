/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const homeVisitApi = createApi({
  reducerPath: 'homeVisitApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/root/home-visit`
  }),
  endpoints: (builder) => ({
    getAllHomeVisits: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addHomeVisit: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getHomeVisit: builder.query<HomeVisitProps | null, string>({
      query: (id) => `detail/${id}`
    }),
    updateHomeVisit: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteHomeVisit: builder.mutation({
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
  useGetAllHomeVisitsQuery, useAddHomeVisitMutation,
  useGetHomeVisitQuery
} = homeVisitApi
