/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const notificationTypeApi = createApi({
  reducerPath: 'notificationTypeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/notification-types`
  }),
  endpoints: (builder) => ({
    getAllNotificationTypes: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addNotificationType: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getNotificationType: builder.query({
      query: (id) => `detail/${id}`
    }),

    deleteNotificationType: builder.mutation({
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
  useGetAllNotificationTypesQuery, useAddNotificationTypeMutation,
  useGetNotificationTypeQuery,
  useDeleteNotificationTypeMutation
} = notificationTypeApi
