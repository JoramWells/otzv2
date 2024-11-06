/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type UserSessionLogInterface } from 'otz-types'

// const customFetch = async (
//   input: NodeRequestInfo,
//   init?: NodeRequestInit
// ) => {
//   if (typeof window === 'undefined') {
//     if (init?.headers) {
//       // Ensure headers are compatible with node-
//       init.headers = new NodeHeaders(init.headers as any)
//     }
//     return await nodeFetch(input, init)
//   } else {
//     return await fetch(input as RequestInfo, init as RequestInit)
//   }
// }

export const userSessionLogsApi = createApi({
  reducerPath: 'userSessionLogsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/users/user-session-logs`
    // fetchFn: typeof window === 'undefined' ? nodeFetch : fetch as any
    // prepareHeaders (headers, { getState }) {
    //   // Add your custom headers here
    //   if (process.env.NEXT_PUBLIC_API_URL !== undefined) {
    //     headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_API_URL)
    //     return headers
    //   }
    // }
  }),
  endpoints: (builder) => ({
    getAllUserSessionLogs: builder.query<UserSessionLogInterface[], void>({
      query: () => 'fetchAll'
    }),
    addUserSessionLog: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getUserSessionLog: builder.query<UserSessionLogInterface[], string>({
      query: (id) => `detail/${id}`
    }),

    updateUserSessionLog: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),

    deleteUserSessionLog: builder.mutation({
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
  useGetAllUserSessionLogsQuery, useUpdateUserSessionLogMutation, useDeleteUserSessionLogMutation, useAddUserSessionLogMutation, useGetUserSessionLogQuery
} = userSessionLogsApi
