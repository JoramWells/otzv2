/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const viralLoadApi = createApi({
  reducerPath: 'viralLoadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/lab/viral-load-tests`
  }),
  endpoints: (builder) => ({
    getAllViralLoadTests: builder.query<any, { hospitalID: string }>({
      query: (params) => {
        if (params) {
          const { hospitalID } = params
          let queryString = ''
          // queryString += `date=${date}`
          queryString += `hospitalID=${hospitalID}`
          return `/fetchAll?${queryString}`
        }
        return 'fetchAll'
      }
    }),
    getAllVlCategories: builder.query<any, void>({
      query: () => 'fetchAllVLCategory'
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
    getAllViralLoadByPatientID: builder.query({
      query: (id) => `details/${id}`
    }),
    getViralLoadTestByPatientVisitID: builder.query({
      query: (id) => `detail-by-visit/${id}`
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
  useGetAllViralLoadTestsQuery,
  useUpdateViralLoadTestMutation,
  useGetAllViralLoadByPatientIDQuery,
  useDeleteViralLoadTestMutation,
  useAddViralLoadTestMutation,
  useGetViralLoadTestQuery,
  useGetOTZPatientEnrollmentQuery,
  useGetAllVlCategoriesQuery,
  useGetViralLoadTestByPatientVisitIDQuery
} = viralLoadApi
