/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Post {
  id: number
  name: string
}

type PostsResponse = Post[]

export const patientsApi = createApi({
  reducerPath: 'patientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/patient/patients'
  }),
  endpoints: (builder) => ({
    getAllPatients: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addPatient: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getPatient: builder.query({
      query: (id) => `detail/${id}`
    }),
    updatePatient: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
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
  useGetAllPatientsQuery, useUpdatePatientMutation,
  useDeletePatientMutation, useAddPatientMutation, useGetPatientQuery
} = patientsApi
