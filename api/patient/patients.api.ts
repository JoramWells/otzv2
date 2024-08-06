/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type PatientAttributes } from 'otz-types'

interface Post {
  id: number
  name: string
}

type PostsResponse = Post[]

export const patientsApi = createApi({
  reducerPath: 'patientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/users/patients`
    // prepareHeaders (headers, { getState }) {
    //   // Add your custom headers here
    //   if (process.env.NEXT_PUBLIC_API_URL !== undefined) {
    //     headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_API_URL)
    //     return headers
    //   }
    // }
  }),
  endpoints: (builder) => ({
    getAllPatients: builder.query<PatientAttributes[], void>({
      query: () => 'fetchAll'
    }),
    getAllPMTCTPatients: builder.query<any, void>({
      query: () => 'fetchAllPMTCT'
    }),
    getAllEligibleOTZPatients: builder.query<any, void>({
      query: () => 'fetchAllOTZ'
    }),
    addPatient: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getPatient: builder.query<PatientAttributes, string>({
      query: (id) => `detail/${id}`
    }),
    updatePatient: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    markPatientAsImportant: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `mark-important/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deletePatient: builder.mutation({
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
  useGetAllPatientsQuery, useUpdatePatientMutation, useGetAllPMTCTPatientsQuery, useGetAllEligibleOTZPatientsQuery,
  useDeletePatientMutation, useAddPatientMutation, useGetPatientQuery, useMarkPatientAsImportantMutation
} = patientsApi
