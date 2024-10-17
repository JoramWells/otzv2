/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type ChatsInterface } from '@/context/ChatContext'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/notify/chats`
  }),
  endpoints: (builder) => ({
    getAllChats: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addChats: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getChat: builder.query<ChatsInterface[] | undefined, string>({
      query: (id) => `detail/${id}`
    }),
    updateChat: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),

    deleteChat: builder.mutation({
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
  useGetAllChatsQuery, useAddChatsMutation,
  useGetChatQuery, useUpdateChatMutation,
  useDeleteChatMutation
} = chatApi
