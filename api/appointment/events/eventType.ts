/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const eventTypeApi = createApi({
  reducerPath: 'eventTypeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/event-type`
  }),
  endpoints: (builder) => ({
    getAllEventType: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addEventType: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getEventType: builder.query({
      query: (id) => `detail/${id}`
    }),

    deleteEventType: builder.mutation({
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
  useGetAllEventTypeQuery, useAddEventTypeMutation,
  useGetEventTypeQuery,
  useDeleteEventTypeMutation
} = eventTypeApi
