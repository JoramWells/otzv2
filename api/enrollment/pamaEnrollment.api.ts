/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pamaEnrollmentApi = createApi({
  reducerPath: 'pamaEnrollmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/users/pama-enrollment`
  }),
  endpoints: (builder) => ({
    getAllPAMAEnrollments: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addPAMAEnrollment: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getPAMAEnrollment: builder.query({
      query: (id) => `detail/${id}`
    }),
    getPAMAPatientEnrollment: builder.query({
      query: (id) => `patient/${id}`
    }),
    updatePAMAEnrollment: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deletePAMAEnrollment: builder.mutation({
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
  useGetAllPAMAEnrollmentsQuery, useUpdatePAMAEnrollmentMutation,
  useDeletePAMAEnrollmentMutation, useAddPAMAEnrollmentMutation, useGetPAMAEnrollmentQuery,
  useGetPAMAPatientEnrollmentQuery
} = pamaEnrollmentApi
