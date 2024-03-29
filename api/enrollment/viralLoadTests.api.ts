/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const viralLoadApi = createApi({
  reducerPath: 'viralLoadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/enrollment-service/viral-load-tests'
  }),
  endpoints: (builder) => ({
    getAllViralLoadTests: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addViralLoadTest: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getViralLoadTest: builder.query({
      query: (id) => `detail/${id}`
    }),
    getOTZPatientEnrollment: builder.query({
      query: (id) => `patient/${id}`
    }),
    updateViralLoadTest: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteViralLoadTest: builder.mutation({
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
  useGetAllViralLoadTestsQuery, useUpdateViralLoadTestMutation,
  useDeleteViralLoadTestMutation, useAddViralLoadTestMutation, useGetViralLoadTestQuery,
  useGetOTZPatientEnrollmentQuery
} = viralLoadApi
