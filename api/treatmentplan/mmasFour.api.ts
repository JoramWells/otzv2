/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type MMASInterface } from '@/app/users/reports/mmas/columns'
import { type PaginatedResponseInterface, type DefaultParamsInterface } from '@/dtos/PaginatedResponseInterface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type MMASFourAttributes, type PatientAttributes } from 'otz-types'

export type ExtendedMMASFourInterface = MMASFourAttributes & {
  Patient: PatientAttributes
}

export type MMASFourResponseInterface = PaginatedResponseInterface<ExtendedMMASFourInterface>

export const mmasFourApi = createApi({
  reducerPath: 'mmasFourApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/treatmentplan/mmas-4`
  }),
  endpoints: (builder) => ({
    getAllMmasFour: builder.query<
    MMASFourResponseInterface,
    DefaultParamsInterface
    >({
      query: (params) => {
        if (params) {
          const { hospitalID, page, pageSize, searchQuery } =
            params
          let queryString = ''
          queryString += `page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&searchQuery=${searchQuery}`
          queryString += `&hospitalID=${hospitalID}`
          return `/fetchAll?${queryString}`
        }
        return 'fetchAll'
      }
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
