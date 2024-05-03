/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const caseManagerApi = createApi({
  reducerPath: 'caseManagerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/users/casemanager`
  }),
  endpoints: (builder) => ({
    getAllCaseManagers: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addCaseManager: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getCaseManager: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateCaseManager: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteCaseManager: builder.mutation({
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
  useGetAllCaseManagersQuery, useUpdateCaseManagerMutation,
  useDeleteCaseManagerMutation, useAddCaseManagerMutation, useGetCaseManagerQuery
} = caseManagerApi
