/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface LabRequestProps {
  id: string
}

export const internalLabRequestApi = createApi({
  reducerPath: 'internalLabRequestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/lab/internal-lab-request'
  }),
  endpoints: (builder) => ({
    getAllInternalLabRequests: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addInternalLabRequest: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getInternalLabRequest: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateInternalLabRequest: builder.mutation<LabRequestProps, any>({
      query: ({ id, ...patch }) => ({
        url: `update/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteInternalLabRequest: builder.mutation({
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
  useGetAllInternalLabRequestsQuery, useUpdateInternalLabRequestMutation,
  useAddInternalLabRequestMutation, useGetInternalLabRequestQuery
} = internalLabRequestApi
