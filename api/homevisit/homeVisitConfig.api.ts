/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type HomeVisitConfigAttributes } from 'otz-types'

export const homeVisitConfigApi = createApi({
  reducerPath: 'homeVisitConfigApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/home-visit-config`
  }),
  endpoints: (builder) => ({
    getAllHomeVisitConfig: builder.query<HomeVisitConfigAttributes, void>({
      query: () => 'fetchAll'
    }),
    addHomeVisitConfig: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getHomeVisitConfig: builder.query<HomeVisitConfigAttributes, string>({
      query: (id) => `details/${id}`
    }),
    updateHomeVisitConfig: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteHomeVisitConfig: builder.mutation({
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
  useGetAllHomeVisitConfigQuery, useAddHomeVisitConfigMutation,
  useGetHomeVisitConfigQuery
} = homeVisitConfigApi
