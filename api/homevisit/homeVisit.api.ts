/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type HomeVisitInputProps } from '@/app/home-visit/columns'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const homeVisitApi = createApi({
  reducerPath: 'homeVisitApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/home-visit`
  }),
  endpoints: (builder) => ({
    getAllHomeVisits: builder.query<HomeVisitInputProps[], void>({
      query: () => 'fetchAll'
    }),
    addHomeVisit: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getHomeVisit: builder.query<HomeVisitInputProps[], string>({
      query: (id) => `details/${id}`
    }),
    getAllHomeVisitByID: builder.query<HomeVisitInputProps[], string>({
      query: (id) => `details/${id}`
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
  useGetHomeVisitQuery, useGetAllHomeVisitByIDQuery
} = homeVisitApi
