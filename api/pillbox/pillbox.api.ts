/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pillBoxApi = createApi({
  reducerPath: 'pillBoxApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/root/pills'
  }),
  endpoints: (builder) => ({
    getAllPills: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addPill: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getPill: builder.query({
      query: (id) => `detail/${id}`
    }),
    updatePill: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deletePill: builder.mutation({
      query (id) {
        return {
          url: `delete/${id}`,
          method: 'DELETE'
        }
      }
    })
  })
})

export const {
  useGetAllPillsQuery, useUpdatePillMutation,
  useDeletePillMutation, useAddPillMutation, useGetPillQuery
} = pillBoxApi
