/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/notifications`
  }),
  endpoints: (builder) => ({
    getAllNotifications: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addNotification: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getNotification: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateNotification: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),

    deleteNotification: builder.mutation({
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
  useGetAllNotificationsQuery, useAddNotificationMutation,
  useGetNotificationQuery, useUpdateNotificationMutation,
  useDeleteNotificationMutation
} = notificationApi
