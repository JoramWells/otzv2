/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const attendeeApi = createApi({
  reducerPath: 'attendeeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/attendees`
  }),
  endpoints: (builder) => ({
    getAllAttendee: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addAttendee: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getAttendee: builder.query({
      query: (id) => `detail/${id}`
    }),

    deleteAttendee: builder.mutation({
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
  useGetAllAttendeeQuery, useAddAttendeeMutation,
  useGetAttendeeQuery,
  useDeleteAttendeeMutation
} = attendeeApi
