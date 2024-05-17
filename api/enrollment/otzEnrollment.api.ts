/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const otzEnrollmentApi = createApi({
  reducerPath: 'otzEnrollmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/enrollments/otz-enrollment`
  }),
  endpoints: (builder) => ({
    getAllOTZEnrollments: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addOTZEnrollment: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getOTZEnrollment: builder.query({
      query: (id) => `detail/${id}`
    }),
    getOTZPatientEnrollment: builder.query({
      query: (id) => `patient/${id}`
    }),
    updateOTZEnrollment: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteOTZEnrollment: builder.mutation({
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
  useGetAllOTZEnrollmentsQuery, useUpdateOTZEnrollmentMutation,
  useDeleteOTZEnrollmentMutation, useAddOTZEnrollmentMutation, useGetOTZEnrollmentQuery,
  useGetOTZPatientEnrollmentQuery
} = otzEnrollmentApi
