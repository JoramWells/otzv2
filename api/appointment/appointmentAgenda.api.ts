/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type AppointmentAgendaAttributes } from 'otz-types'

export const appointmentAgendaApi = createApi({
  reducerPath: 'appointmentAgendaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/appointment-agenda`
  }),
  endpoints: (builder) => ({
    getAllAppointmentAgenda: builder.query<AppointmentAgendaAttributes[], void>({
      query: () => 'fetchAll'
    }),
    addAppointmentAgenda: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getAppointmentAgenda: builder.query({
      query: (id) => `detail/${id}`
    }),

    deleteAppointmentAgenda: builder.mutation({
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
  useGetAllAppointmentAgendaQuery, useAddAppointmentAgendaMutation,
  useGetAppointmentAgendaQuery,
  useDeleteAppointmentAgendaMutation
} = appointmentAgendaApi
