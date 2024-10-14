/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface AppointmentProps {
  medicationsDue?: boolean
}

export const timeAndWorkApi = createApi({
  reducerPath: 'timeAndWorkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/time-and-work`
  }),
  endpoints: (builder) => ({
    getAllTimeAndWork: builder.query<any, AppointmentProps>({
      query: (params) => {
        if (params) {
          const { medicationsDue } = params
          let queryString = ''
          queryString += `medicationsDue=${medicationsDue}`
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
          url: `delete${id}`,
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
  useGetTimeAndWorkQuery,
  useUpdateTimeAndWorkMorningScheduleMutation,
  useUpdateTimeAndWorkEveningScheduleMutation,
  useUpdateScheduleMutation
} = timeAndWorkApi
