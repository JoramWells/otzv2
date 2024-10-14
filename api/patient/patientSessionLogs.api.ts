/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type PatientSessionLogInterface } from 'otz-types'
interface Post {
  id: number
  name: string
}

type PostsResponse = Post[]

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

export const patientSessionLogsApi = createApi({
  reducerPath: 'patientSessionLogsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/users/patient-session-logs`
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
    getAllPatientSessionLogs: builder.query<PatientSessionLogInterface[], void>({
      query: () => 'fetchAll'
    }),
    addPatientSessionLog: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getPatientSessionLog: builder.query<PatientSessionLogInterface[], string>({
      query: (id) => `detail/${id}`
    }),

    updatePatientSessionLog: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),

    deletePatientSessionLog: builder.mutation({
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
  useGetAllPatientSessionLogsQuery, useUpdatePatientSessionLogMutation, useDeletePatientSessionLogMutation, useAddPatientSessionLogMutation, useGetPatientSessionLogQuery
} = patientSessionLogsApi
