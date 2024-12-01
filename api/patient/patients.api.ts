/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type PatientAttributes } from 'otz-types'

export interface PatientResponseInterface {
  data: PatientAttributes[]
  page: number
  total: number
  pageSize: number
  searchQuery: string
}

// const customFetch = async (
//   input: NodeRequestInfo,
//   init?: NodeRequestInit
// ) => {
//   if (typeof window === 'undefined') {
//     if (init?.headers) {
//       // Ensure headers are compatible with node-
//       init.headers = new NodeHeaders(init.headers as any)
//     }
//     return await nodeFetch(input, init)
//   } else {
//     return await fetch(input as RequestInfo, init as RequestInit)
//   }
// }

export interface PatientInputParams {
  hospitalID: string
  page: number
  pageSize: number
  searchQuery: string
  casemanager: string | null
  calHIVQuery?: string
}

export const patientsApi = createApi({
  reducerPath: 'patientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/users/patients`
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
    getAllPatients: builder.query<
    PatientResponseInterface | null,
    PatientInputParams
    >({
      query: (params) => {
        if (params) {
          const { hospitalID, page, pageSize, searchQuery, calHIVQuery, casemanager } =
            params
          let queryString = ''
          queryString += `hospitalID=${hospitalID}`
          queryString += `&page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&calHIVQuery=${calHIVQuery}`
          queryString += `&casemanager=${casemanager}`
          queryString += `&searchQuery=${searchQuery}`
          return `/fetchAll/?${queryString}`
        }
        return 'fetchAll'
      }
    }),
    getAllPMTCTPatients: builder.query<any, void>({
      query: () => 'fetchAllPMTCT'
    }),
    getAllEligibleOTZPatients: builder.query<PatientResponseInterface, PatientInputParams>({
      query: (params) => {
        if (params) {
          const { hospitalID, page, pageSize, searchQuery } =
            params
          let queryString = ''
          queryString += `hospitalID=${hospitalID}`
          queryString += `&page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&searchQuery=${searchQuery}`
          return `/fetchAllOTZ/?${queryString}`
        }
        return 'fetchAllOTZ'
      }
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
    getPatientByUserID: builder.query<PatientAttributes, string>({
      query: (id) => `user-patient-detail/${id}`
    }),
    getImportantPatients: builder.query<PatientAttributes[], any>({
      query: (params) => {
        if (params) {
          const { limit } = params

          return `important-patients?limit=${limit}`
        }
        return 'important-patients'
      }
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
  useDeletePatientMutation, useAddPatientMutation, useGetPatientQuery, useMarkPatientAsImportantMutation, useGetImportantPatientsQuery,
  useGetPatientByUserIDQuery
} = patientsApi
