/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type PatientAttributes, type ImportantPatientsInterface } from 'otz-types'

export type ExtendedImportantPatientInterface = ImportantPatientsInterface & { Patient: PatientAttributes } & { count?: string }

export const importantPatientApi = createApi({
  reducerPath: 'importantPatientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/users/important-patients`
    // fetchFn: typeof window === 'undefined' ? nodeFetch : fetch as any
    // prepareHeaders (headers, { getState }) {
    //   // Add your custom headers here
    //   if (process.env.NEXT_PUBLIC_API_URL !== undefined) {
    //     headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_API_URL)
    //     return headers
    //   }
    // }
  }),
  endpoints: (builder) => ({
    getAllImportantPatients: builder.query<ExtendedImportantPatientInterface[], void>({
      query: () => 'fetchAll'
    }),

    addImportantPatient: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getImportantPatient: builder.query<ExtendedImportantPatientInterface[], string>({
      query: (id) => `detail/${id}`
    }),
    getImportantByPatientID: builder.query<ExtendedImportantPatientInterface, string>({
      query: (id) => `important-by-patient-id/${id}`
    }),
    updateImportantPatient: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteImportantPatient: builder.mutation({
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
  useGetAllImportantPatientsQuery, useUpdateImportantPatientMutation,
  useDeleteImportantPatientMutation, useAddImportantPatientMutation, useGetImportantPatientQuery, useGetImportantByPatientIDQuery

} = importantPatientApi
