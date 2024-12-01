/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type MMASInterface } from '@/app/users/reports/mmas/columns'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mmasFourApi = createApi({
  reducerPath: 'mmasFourApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/mmas-4`
  }),
  endpoints: (builder) => ({
    getAllMmasFour: builder.query<MMASInterface[], void>({
      query: () => 'fetchAll'
    }),
    addMmasFour: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getMmasFour: builder.query<MMASInterface | undefined, string>({
      query: (id) => `detail/${id}`
    }),
    getMmasFourByPatientID: builder.query({
      query: (id) => `by-patient-id/${id}`
    }),
    getMmasFourByVisitID: builder.query({
      query: (id) => `by-visit-id/${id}`
    }),
    deleteMmasFour: builder.mutation({
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
  useGetAllMmasFourQuery, useAddMmasFourMutation, useGetMmasFourByPatientIDQuery,
  useGetMmasFourQuery, useGetMmasFourByVisitIDQuery,
  useDeleteMmasFourMutation
} = mmasFourApi
