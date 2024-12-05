/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type PatientAttributes, type ImportantPatientsInterface } from 'otz-types'

export type ExtendedImportantPatientInterface = ImportantPatientsInterface & { Patient: PatientAttributes }

export const CALHIVApi = createApi({
  reducerPath: 'CALHIVApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/users/cal-hiv`
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
    getAllCALHIVs: builder.query<ExtendedImportantPatientInterface[], void>({
      query: () => 'fetchAll'
    }),

    addCALHIV: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getCALHIV: builder.query<ExtendedImportantPatientInterface[], string>({
      query: (id) => `detail/${id}`
    }),
    getCALHIVByHospitalID: builder.query<
    ExtendedImportantPatientInterface,
    { hospitalID: string }
    >({
      query: (params) => {
        if (params) {
          const {
            hospitalID

          } = params
          let queryString = ''
          queryString += `hospitalID=${hospitalID}`
          return `/by-hospital-id/?${queryString}`
        }
        return 'by-hospital-id'
      }
    }),
    updateCALHIV: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteCALHIV: builder.mutation({
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
  useGetAllCALHIVsQuery, useUpdateCALHIVMutation,
  useDeleteCALHIVMutation, useAddCALHIVMutation, useGetCALHIVQuery, useGetCALHIVByHospitalIDQuery

} = CALHIVApi
