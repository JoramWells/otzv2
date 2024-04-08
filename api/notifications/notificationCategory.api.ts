/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const notificationCategoryApi = createApi({
  reducerPath: 'notificationCategoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/appointment-service/notification-categories'
  }),
  endpoints: (builder) => ({
    getAllNotificationCategories: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addNotificationCategory: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getNotificationCategory: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateNotificationCategory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),

    deleteNotificationCategory: builder.mutation({
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
  useGetAllNotificationCategoriesQuery, useAddNotificationCategoryMutation,
  useGetNotificationCategoryQuery, useUpdateNotificationCategoryMutation,
  useDeleteNotificationCategoryMutation
} = notificationCategoryApi
