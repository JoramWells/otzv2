/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const chatMessageApi = createApi({
  reducerPath: 'chatMessageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/notify/messages`
  }),
  endpoints: (builder) => ({
    getAllChatMessages: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addChatMessages: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getChatMessage: builder.query({
      query: (id) => {
        return `detail/${id}`
      }
    }),
    updateChatMessage: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),

    deleteChatMessage: builder.mutation({
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
  useGetAllChatMessagesQuery, useAddChatMessagesMutation,
  useGetChatMessageQuery, useUpdateChatMessageMutation,
  useDeleteChatMessageMutation
} = chatMessageApi
