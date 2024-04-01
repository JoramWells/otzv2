/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface OccupationProps {
  appointmentID?: string
  notificationType: string
  phoneNo: string
  messageText: string
  bufferTime: string
  scheduledDate: string
  scheduledTime: string
}

export const smsApi = createApi({
  reducerPath: 'smsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/root-service/sms'
  }),
  endpoints: (builder) => ({
    getAllSMS: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addSMS: builder.mutation<string, OccupationProps>({
      query: (newUser: OccupationProps) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getSMS: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateSMS: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteSMS: builder.mutation({
      query (id) {
        return {
          url: `delete${id}`,
          method: 'DELETE'
        }
      }
    })
  })
})

export const {
  useGetAllSMSQuery, useAddSMSMutation,
  useGetSMSQuery,
  useUpdateSMSMutation, useDeleteSMSMutation
} = smsApi
