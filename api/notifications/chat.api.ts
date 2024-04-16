/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/appointment/chats'
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
    getChat: builder.query({
      query: (id) => `fetchAll/${id}`
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
