/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type AppointmentAgendaAttributes, type PatientAttributes, type AppointmentAttributes } from 'otz-types'

interface AppointmentTypeProps {
  date?: string
  mode?: string
  hospitalID: string
  page: number
  pageSize: number
  searchQuery: string
}

export type ExtendedAppointmentInputProps = AppointmentAttributes & {
  Patient: PatientAttributes
} & { AppointmentAgenda: AppointmentAgendaAttributes } & {
  AppointmentStatus: {
    statusDescription:
    | 'Pending'
    | 'Upcoming'
    | 'Completed'
    | 'Rescheduled'
    | 'Cancelled'
  }
}

export interface AppointmentResponseInterface {
  data: ExtendedAppointmentInputProps[]
  page: number
  total: number
  pageSize: number
  searchQuery: string
}

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/appointments`
  }),
  endpoints: (builder) => ({
    getAllAppointments: builder.query<
    AppointmentResponseInterface,
    AppointmentTypeProps
    >({
      query: (params) => {
        if (params) {
          const { date, mode, hospitalID, page, pageSize, searchQuery } =
            params
          let queryString = ''
          queryString += `date=${date}`
          queryString += `&mode=${mode}`
          queryString += `&page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&searchQuery=${searchQuery}`
          queryString += `&hospitalID=${hospitalID}`
          return `/fetchAll/?${queryString}`
        }
        return '/fetchAll'
      }
    }),
    getAllWeeklyAppointments: builder.query<any, void>({
      query: () => 'fetchAllWeekly'
    }),
    addAppointment: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getAppointment: builder.query<ExtendedAppointmentInputProps, string>({
      query: (id) => {
        return `detail/${id}`
      }
    }),
    getAppointmentDetail: builder.query({
      query: (id) => `appointmentDetail/${id}`
    }),
    getAppointmentAgendaCount: builder.query({
      query: (params) => {
        if (params) {
          const { hospitalID, date } = params
          let queryString = ''
          queryString += `date=${date}`
          queryString += `&hospitalID=${hospitalID}`
          return `/appointment-agenda-count/?${queryString}`
        }
        return '/appointment-agenda-count'
      }
    }),
    getStarredPatientAppointments: builder.query<AppointmentResponseInterface, AppointmentTypeProps>({
      query: (params) => {
        if (params) {
          const { hospitalID, page, pageSize, searchQuery } = params
          let queryString = ''
          queryString += `page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&searchQuery=${searchQuery}`
          queryString += `&hospitalID=${hospitalID}`
          return `/starred-patient-appointments/?${queryString}`
        }
        return '/starred-patient-appointments'
      }
    }),
    getPriorityAppointmentDetail: builder.query({
      query: (id) => `priorityAppointmentDetail/${id}`
    }),
    getRecentPatientAppointment: builder.mutation({
      query: ({ id, params }) => {
        if (params) {
          const { agenda } = params
          return `recent-appointment/${id}?agenda=${agenda}`
        }
        return `recent-appointment/${id}`
      }
    }),
    getRecentAppointments: builder.query<
    ExtendedAppointmentInputProps[],
    { hospitalID: string }
    >({
      query: (params) => {
        if (params) {
          const { hospitalID } = params
          let queryString = ''
          queryString += `hospitalID=${hospitalID}`
          return `/recent-appointments/?${queryString}`
        }
        return '/recent-appointments'
      }
    }),
    updateAppointment: builder.mutation<void, any>({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteAppointment: builder.mutation({
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
  useGetAllAppointmentsQuery, useAddAppointmentMutation, useGetPriorityAppointmentDetailQuery,
  useGetAppointmentQuery, useGetAppointmentDetailQuery, useGetRecentAppointmentsQuery,
  useUpdateAppointmentMutation, useDeleteAppointmentMutation, useGetRecentPatientAppointmentMutation,
  useGetAllWeeklyAppointmentsQuery, useGetAppointmentAgendaCountQuery, useGetStarredPatientAppointmentsQuery
} = appointmentApi
