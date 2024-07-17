/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ETLProps {
  id?: string
  ETLDescription: string
}

export const etlApi = createApi({
  reducerPath: 'etlApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/articles/linelist-csv`
  }),
  endpoints: (builder) => ({
    getAllETL: builder.query<any, void>({
      query: () => 'fetchAll'
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
