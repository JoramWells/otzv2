/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appointmentStatusApi = createApi({
  reducerPath: 'appointmentStatusApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/appointment/appointment-status'
  }),
  endpoints: (builder) => ({
    getAllAppointmentStatus: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addAppointmentStatus: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getAppointmentStatus: builder.query({
      query: (id) => `detail/${id}`
    }),

    deleteAppointmentStatus: builder.mutation({
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
  useGetAllAppointmentStatusQuery, useAddAppointmentStatusMutation,
  useGetAppointmentStatusQuery,
  useDeleteAppointmentStatusMutation
} = appointmentStatusApi
