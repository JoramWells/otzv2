/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pmtctProfileEnrollmentApi = createApi({
  reducerPath: 'pmtctProfileEnrollmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/enrollments/pmtct-enrollment`
  }),
  endpoints: (builder) => ({
    getAllPMTCTProfileEnrollments: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addPMTCTProfileEnrollment: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getPMTCTProfileEnrollment: builder.query({
      query: (id) => `detail/${id}`
    }),
    getPMTCTProfilePatientEnrollment: builder.query({
      query: (id) => `patient/${id}`
    }),
    updatePMTCTProfileEnrollment: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deletePMTCTProfileEnrollment: builder.mutation({
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
  useGetAllPMTCTProfileEnrollmentsQuery, useUpdatePMTCTProfileEnrollmentMutation,
  useDeletePMTCTProfileEnrollmentMutation, useAddPMTCTProfileEnrollmentMutation, useGetPMTCTProfileEnrollmentQuery,
  useGetPMTCTProfilePatientEnrollmentQuery
} = pmtctProfileEnrollmentApi
