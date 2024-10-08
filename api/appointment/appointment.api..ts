/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type AppointmentAttributes } from 'otz-types'

interface AppointmentProps {
  date?: string
  mode?: string
}

export type AppointmentInputProps = AppointmentAttributes & {
  AppointmentAgenda: {
    agendaDescription: string
  }
  AppointmentStatus: {
    statusDescription: string
  }
}

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/appointments`
  }),
  endpoints: (builder) => ({
    getAllAppointments: builder.query<any, AppointmentProps>({
      query: (params) => {
        if (params) {
          const { date, mode } = params
          let queryString = ''
          queryString += `date=${date}`
          queryString += `&mode=${mode}`
          return `/fetchAll?${queryString}`
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
    getAppointment: builder.query<AppointmentInputProps, string>({
      query: (id) => {
        return `detail/${id}`
      }
    }),
    getAppointmentDetail: builder.query({
      query: (id) => `appointmentDetail/${id}`
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
    getAllPriorityAppointments: builder.query<any, void>({
      query: () => 'priorityAppointments'
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
  useGetAppointmentQuery, useGetAppointmentDetailQuery, useGetAllPriorityAppointmentsQuery,
  useUpdateAppointmentMutation, useDeleteAppointmentMutation, useGetRecentPatientAppointmentMutation,
  useGetAllWeeklyAppointmentsQuery
} = appointmentApi
