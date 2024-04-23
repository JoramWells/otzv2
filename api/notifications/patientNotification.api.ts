/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const patientNotificationApi = createApi({
  reducerPath: 'patientNotificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/appointment/patient-notifications'
  }),
  endpoints: (builder) => ({
    getAllPatientNotifications: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addPatientNotification: builder.mutation({
      query: (newPatient) => ({
        url: 'add',
        method: 'POST',
        body: newPatient
      })
    }),
    getPatientNotification: builder.query({
      query: (id) => `detail/${id}`
    }),
    updatePatientNotification: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),

    deletePatientNotification: builder.mutation({
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
  useGetAllPatientNotificationsQuery, useAddPatientNotificationMutation,
  useGetPatientNotificationQuery, useUpdatePatientNotificationMutation,
  useDeletePatientNotificationMutation
} = patientNotificationApi
