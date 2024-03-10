/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface CountyProps {
  id: string
  countyName: string
}

export const countyApi = createApi({
  reducerPath: 'countyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/counties'
  }),
  endpoints: (builder) => ({
    getAllCounties: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addCounty: builder.mutation<string, CountyProps>({
      query: (newUser: CountyProps) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getCounty: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateCounty: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteCounty: builder.mutation({
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
  useGetAllCountiesQuery, useAddCountyMutation,
  useGetCountyQuery,
  useUpdateCountyMutation, useDeleteCountyMutation
} = countyApi
