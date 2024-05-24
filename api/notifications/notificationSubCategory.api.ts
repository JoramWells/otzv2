/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const notificationSubCategoryApi = createApi({
  reducerPath: 'notificationSubCategoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/notify/notification-sub-categories`
  }),
  endpoints: (builder) => ({
    getAllNotificationSubCategories: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addNotificationSubCategory: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getNotificationSubCategory: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateNotificationSubCategory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),

    deleteNotificationSubCategory: builder.mutation({
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
  useGetAllNotificationSubCategoriesQuery, useAddNotificationSubCategoryMutation,
  useGetNotificationSubCategoryQuery, useUpdateNotificationSubCategoryMutation,
  useDeleteNotificationSubCategoryMutation
} = notificationSubCategoryApi
