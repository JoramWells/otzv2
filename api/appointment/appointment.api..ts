/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type AppointmentAgendaAttributes, type PatientAttributes, type AppointmentAttributes } from 'otz-types'

interface AppointmentTypeProps {
  date?: string;
  mode?: string;
  hospitalID: string;
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

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/appointments`
  }),
  endpoints: (builder) => ({
    getAllAppointments: builder.query<
    ExtendedAppointmentInputProps[],
    AppointmentTypeProps
    >({
      query: (params) => {
        if (params) {
          const { date, mode, hospitalID } = params
          let queryString = ''
          queryString += `date=${date}`
          queryString += `&mode=${mode}`
          queryString += `&mode=${hospitalID}`;
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
    getAppointment: builder.query<ExtendedAppointmentInputProps, string>({
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
