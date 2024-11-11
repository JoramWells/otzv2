/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type PatientVisitsInterface } from 'otz-types'

interface Post {
  id: number
  name: string
}

type PostsResponse = Post[]

export const patientVisitsApi = createApi({
  reducerPath: 'patientVisitsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/users/patient-visits`
    // prepareHeaders (headers, { getState }) {
    //   // Add your custom headers here
    //   if (process.env.NEXT_PUBLIC_API_URL !== undefined) {
    //     headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_API_URL)
    //     return headers
    //   }
    // }
  }),
  endpoints: (builder) => ({
    getAllPatientVisits: builder.query<PatientVisitsInterface[], void>({
      query: () => 'fetchAll'
    }),
    getAllUserPatientCount: builder.query<PatientVisitsInterface[], void>({
      query: (id) => 'user-patient-count/1'
    }),
    addPatientVisit: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getPatientVisit: builder.query({
      query: (id) => `detail/${id}`
    }),
    getHistoryPatientVisit: builder.query<any, string>({
      query: (id) => `patient-history/${id}`
    }),
    updatePatientVisit: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deletePatientVisit: builder.mutation({
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
  useGetAllPatientVisitsQuery, useUpdatePatientVisitMutation, useGetHistoryPatientVisitQuery,
  useDeletePatientVisitMutation, useAddPatientVisitMutation, useGetPatientVisitQuery, useGetAllUserPatientCountQuery
} = patientVisitsApi
