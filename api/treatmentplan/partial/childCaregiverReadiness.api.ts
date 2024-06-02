import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const childCaregiverReadinessApi = createApi({
  reducerPath: 'childCaregiverReadinessApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/child-readiness`
  }),
  endpoints: (builder) => ({
    getAllChildCaregiverReadiness: builder.query({
      query: () => 'fetchAll'
    }),
    addChildCaregiverReadiness: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getChildCaregiverReadiness: builder.query({
      query: (id) => `detail/${id}`
    }),
    getAllChildCaregiverReadinessByVisitId: builder.query({
      query: (id) => `details/${id}`
    }),
    updateChildCaregiverReadiness: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteChildCaregiverReadiness: builder.mutation({
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
  useGetAllChildCaregiverReadinessQuery, useAddChildCaregiverReadinessMutation, useGetAllChildCaregiverReadinessByVisitIdQuery,
  useGetChildCaregiverReadinessQuery
} = childCaregiverReadinessApi
