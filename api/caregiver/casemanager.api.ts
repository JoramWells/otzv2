import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const caseManagerApi = createApi({
  reducerPath: 'caseManagerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/patient/casemanager'
  }),
  endpoints: (builder) => ({
    getAllCaseManagers: builder.query({
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
