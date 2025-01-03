/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type LineListCSVInterface } from 'otz-types'

export type ExtendedLineListInterface = LineListCSVInterface & {
  User: {
    firstName: string
    middleName: string
  }
}

export interface LineListResponseInterface {
  data: ExtendedLineListInterface[]
  page: number
  total: number
  pageSize: number
  searchQuery: string
}

export const etlApi = createApi({
  reducerPath: 'etlApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/articles/linelist-csv`
  }),
  endpoints: (builder) => ({
    getAllETL: builder.query<LineListResponseInterface, { hospitalID: string, page: string | number, pageSize: string | number, searchQuery: string }>({
      query: (params) => {
        if (params) {
          const { hospitalID, page, pageSize, searchQuery } = params
          let queryString = ''
          queryString += `page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&searchQuery=${searchQuery}`
          queryString += `&hospitalID=${hospitalID}`
          return `/fetchAll?${queryString}`
        }
        return '/fetchAll'
      }
    }),
    addETL: builder.mutation<string, void>({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getETL: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateETL: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteETL: builder.mutation({
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
  useGetAllETLQuery, useAddETLMutation,
  useGetETLQuery,
  useUpdateETLMutation, useDeleteETLMutation
} = etlApi
