/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type MMASEightAttributes } from 'otz-types'

export type MMASEightInterface = MMASEightAttributes & {
  Patient: {
    avatar: string
    id: string
    firstName: string
    middleName: string
  }
}

export const mmasEightApi = createApi({
  reducerPath: 'mmasEightApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/mmas-8`
  }),
  endpoints: (builder) => ({
    getAllMmasEight: builder.query<MMASEightInterface[], void>({
      query: () => 'fetchAll'
    }),
    addMmasEight: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getMmasEight: builder.query<MMASEightInterface | undefined, string>({
      query: (id) => `detail/${id}`
    }),
    getMmasEightByPatientID: builder.query<MMASEightInterface, string>({
      query: (id) => `by-patient-id/${id}`
    }),
    getMmasEightByVisitID: builder.query<MMASEightInterface, string>({
      query: (id) => `by-visit-id/${id}`
    }),
    deleteMmasEight: builder.mutation({
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
  useGetAllMmasEightQuery, useAddMmasEightMutation, useGetMmasEightByPatientIDQuery,
  useGetMmasEightQuery, useGetMmasEightByVisitIDQuery,
  useDeleteMmasEightMutation
} = mmasEightApi
