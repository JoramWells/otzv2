/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appointmentAgendaApi = createApi({
  reducerPath: 'appointmentAgendaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/root-service//appointment-agenda'
  }),
  endpoints: (builder) => ({
    getAllAppointmentAgenda: builder.query<any, void>({
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
          url: `delete${id}`,
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
