/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface WardProps {
  id: string
  countyID: string
  subCountyName: string
  ward: string
}

export const wardApi = createApi({
  reducerPath: 'wardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/root-service/wards`
  }),
  endpoints: (builder) => ({
    getAllWards: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addWard: builder.mutation<string, WardProps>({
      query: (newWard: WardProps) => ({
        url: 'add',
        method: 'POST',
        body: newWard
      })
    }),
    getWard: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateWard: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteWard: builder.mutation({
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
  useGetAllWardsQuery, useAddWardMutation,
  useGetWardQuery,
  useUpdateWardMutation, useDeleteWardMutation
} = wardApi
