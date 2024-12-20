/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type HomeVisitInputProps } from '@/app/home-visit/columns'
import { type DefaultParamsInterface } from '@/dtos/PaginatedResponseInterface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type HomeVisitAttributes } from 'otz-types'

export const homeVisitApi = createApi({
  reducerPath: 'homeVisitApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/home-visit`
  }),
  endpoints: (builder) => ({
    getAllHomeVisits: builder.query<HomeVisitAttributes[], DefaultParamsInterface>({
      query: (params) => {
        if (params) {
          const { hospitalID, page, pageSize, searchQuery } =
            params
          let queryString = ''

          queryString += `page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&searchQuery=${searchQuery}`
          queryString += `&hospitalID=${hospitalID}`
          return `/fetchAll/?${queryString}`
        }
        return '/fetchAll'
      }
    }),
    addHomeVisit: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getHomeVisit: builder.query<HomeVisitInputProps, string>({
      query: (id) => `detail/${id}`
    }),
    getAllHomeVisitByID: builder.query<HomeVisitAttributes[], string>({
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
