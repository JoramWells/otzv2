/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type DefaultParamsInterface, type PaginatedResponseInterface } from '@/dtos/PaginatedResponseInterface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type PatientAttributes, type TimeAndWorkAttributes } from 'otz-types'

type AppointmentProps = {
  medicationsDue?: boolean
} & DefaultParamsInterface

export type ExtendedTimeAndWorkInterface = TimeAndWorkAttributes & {
  Patient: PatientAttributes
}

export type TimeAndWorkResponseInterface = PaginatedResponseInterface<ExtendedTimeAndWorkInterface>

export const timeAndWorkApi = createApi({
  reducerPath: 'timeAndWorkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/time-and-work`
  }),
  endpoints: (builder) => ({
    getAllTimeAndWork: builder.query<
    TimeAndWorkResponseInterface,
    AppointmentProps
    >({
      query: (params) => {
        if (params) {
          const { medicationsDue, hospitalID, page, pageSize, searchQuery } =
            params
          let queryString = ''
          queryString += `medicationsDue=${medicationsDue}`
          queryString += `&page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&searchQuery=${searchQuery}`
          queryString += `&hospitalID=${hospitalID}`
          return `/fetchAll?${queryString}`
        }
        return 'fetchAll'
      }
    }),

    addTimeAndWork: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getTimeAndWork: builder.query({
      query: (id) => `detail/${id}`
    }),
    getTimeAndWorkByPatientID: builder.query({
      query: (id) => `patient-detail/${id}`
    }),
    getTimeAndWorkByVisitID: builder.query({
      query: (id) => `by-visit-id/${id}`
    }),
    updateTimeAndWork: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    updateTimeAndWorkMorningSchedule: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/update-morning-schedule/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    updateTimeAndWorkEveningSchedule: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/update-evening-schedule/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    getRecentTimeAndWork: builder.query<
    TimeAndWorkResponseInterface,
    { hospitalID: string }
    >({
      query: (params) => {
        if (params) {
          const { hospitalID } =
            params
          let queryString = ''
          queryString += `hospitalID=${hospitalID}`
          return `/find-recent?${queryString}`
        }
        return 'find-recent'
      }
    }),
    updateSchedule: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/update-schedule/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteTimeAndWork: builder.mutation({
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
  useGetAllTimeAndWorkQuery,
  useAddTimeAndWorkMutation,
  useGetTimeAndWorkByPatientIDQuery,
  useGetTimeAndWorkQuery, useGetTimeAndWorkByVisitIDQuery,
  useUpdateTimeAndWorkMorningScheduleMutation,
  useUpdateTimeAndWorkEveningScheduleMutation,
  useUpdateScheduleMutation, useDeleteTimeAndWorkMutation, useGetRecentTimeAndWorkQuery
} = timeAndWorkApi
