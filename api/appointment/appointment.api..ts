/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/appointments'
  }),
  endpoints: (builder) => ({
    getAllAppointments: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addAppointment: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getAppointment: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateCreditPayment: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteAppointment: builder.mutation({
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
  useGetAllAppointmentsQuery, useAddAppointmentMutation,
  useGetAppointmentQuery,
  useUpdateCreditPaymentMutation, useDeleteAppointmentMutation
} = appointmentApi
