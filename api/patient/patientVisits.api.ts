/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type PatientAttributes, type UserInterface, type PatientVisitsInterface } from 'otz-types'

export type ExtendedPatientVisitsInterface = PatientVisitsInterface & {
  Patient: PatientAttributes
  User: UserInterface
}

interface Post {
  id: number
  name: string
}

export interface UserActivityData {
  count: string
  User: {
    firstName: string
    middleName: string
  }
}

export interface PatientVisitInputParams {
  id?: string
  hospitalID?: string
  page: number
  pageSize: number
  searchQuery: string
}

export interface PatientVisitResponseInterface {
  data: ExtendedPatientVisitsInterface[]
  page: number
  total: number
  pageSize: number
  searchQuery: string
}

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
    getAllPatientVisits: builder.query<
    PatientVisitResponseInterface,
    PatientVisitInputParams
    >({
      query: (params) => {
        if (params) {
          const { hospitalID, page, pageSize, searchQuery } = params
          let queryString = ''
          queryString += `hospitalID=${hospitalID}`
          queryString += `&page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&searchQuery=${searchQuery}`
          return `/fetchAll/?${queryString}`
        }
        return 'fetchAll'
      }
    }),
    getAllUserPatientCount: builder.query<PatientVisitsInterface[], void>({
      query: (id) => 'user-patient-count/1'
    }),
    getAllUserActivitiesCount: builder.query<UserActivityData[], void>({
      query: (id) => 'user-activities-count/1'
    }),
    addPatientVisit: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getPatientVisit: builder.query<ExtendedPatientVisitsInterface, string>({
      query: (id) => `detail/${id}`
    }),
    getHistoryPatientVisit: builder.query<PatientVisitResponseInterface, PatientVisitInputParams>({
      query: (params) => {
        if (params) {
          const { id, page, pageSize, searchQuery } = params
          let queryString = ''
          queryString += `page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&searchQuery=${searchQuery}`
          return `/patient-history/${id}/?${queryString}`
        }
        return 'patient-history'
      }
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
  useGetAllPatientVisitsQuery, useUpdatePatientVisitMutation, useGetHistoryPatientVisitQuery, useGetAllUserActivitiesCountQuery,
  useDeletePatientVisitMutation, useAddPatientVisitMutation, useGetPatientVisitQuery, useGetAllUserPatientCountQuery
} = patientVisitsApi
