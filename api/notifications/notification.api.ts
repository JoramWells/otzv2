/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type AppModuleInterface, type PaginatedResponseInterface } from 'otz-types'

interface InputProps {
  hospitalID: string
  page: string | number
  pageSize: string | number
  searchQuery: string
}

export interface NotificationInterface {
  id: string
  count: string
  AppModule: AppModuleInterface
  createdAt: string
}

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/notify/notifications`
  }),
  endpoints: (builder) => ({
    getAllNotifications: builder.query<PaginatedResponseInterface<NotificationInterface>, InputProps>({
      query: (params) => {
        if (params) {
          const { hospitalID, page, pageSize, searchQuery } = params
          let queryString = ''
          queryString += `page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&searchQuery=${searchQuery}`
          queryString += `&hospitalID=${hospitalID}`
          return `/fetchAll?${queryString}`
        }
        return 'fetchAll'
      }
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
