import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appointmentStatusApi = createApi({
  reducerPath: 'appointmentStatusApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/appointment-status'
  }),
  endpoints: (builder) => ({
    getAllAppointmentStatus: builder.query({
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
