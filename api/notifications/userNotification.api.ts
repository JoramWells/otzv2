/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userNotificationApi = createApi({
  reducerPath: 'userNotificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/appointment-service/user-notifications'
  }),
  endpoints: (builder) => ({
    getAllUserNotifications: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addUserNotification: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getUserNotification: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateUserNotification: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),

    deleteUserNotification: builder.mutation({
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
  useGetAllUserNotificationsQuery, useAddUserNotificationMutation,
  useGetUserNotificationQuery, useUpdateUserNotificationMutation,
  useDeleteUserNotificationMutation
} = userNotificationApi
