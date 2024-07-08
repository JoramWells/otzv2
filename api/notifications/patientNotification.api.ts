/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const patientNotificationApi = createApi({
  reducerPath: 'patientNotificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/notify/patient-notifications`
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
    getNotificationBYCategory: builder.query({
      query: (params) => {
        // if(params){
        const { type } = params
        let queryString = ''
        queryString += `type=${type}`
        return `/getNotificationByCategory?${queryString}`
        // }
      }
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
  useGetAllPatientNotificationsQuery, useAddPatientNotificationMutation, useGetNotificationBYCategoryQuery,
  useGetPatientNotificationQuery, useUpdatePatientNotificationMutation,
  useDeletePatientNotificationMutation
} = patientNotificationApi
