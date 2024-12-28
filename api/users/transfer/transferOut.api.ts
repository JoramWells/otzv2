/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { type DefaultParamsInterface } from '@/dtos/PaginatedResponseInterface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type PaginatedResponseInterface, type TransferOutInterface } from 'otz-types'

export const transferOutApi = createApi({
  reducerPath: 'transferOutApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/users/transfer-out`
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
    getAllTransferOuts: builder.query<
    PaginatedResponseInterface<TransferOutInterface>,
    DefaultParamsInterface
    >({
      query: (params) => {
        if (params) {
          const { hospitalID, page, pageSize, searchQuery } = params
          let queryString = ''
          queryString += `hospitalID=${hospitalID}`
          queryString += `&page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&searchQuery=${searchQuery}`
          return `/fetchAll/?${queryString}`
        }
        return 'fetchAll'
      }
    }),
    getAllTransferOutByPatientID: builder.query<
    PaginatedResponseInterface<TransferOutInterface>,
    { patientID: string, page: number, pageSize: number, searchQuery: string }
    >({
      query: (params) => {
        if (params) {
          const { patientID, page, pageSize, searchQuery } = params
          let queryString = ''
          queryString += `patientID=${patientID}`
          queryString += `&page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&searchQuery=${searchQuery}`
          return `/all-by-patient-id/?${queryString}`
        }
        return 'all-by-patient-id'
      }
    }),
    addTransferOut: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getTransferOut: builder.query<TransferOutInterface[], string>({
      query: (id) => `detail/${id}`
    }),
    getTransferOutByHospitalID: builder.query<any, { hospitalID: string }>({
      query: (params) => {
        if (params) {
          const { hospitalID } = params
          let queryString = ''
          queryString += `hospitalID=${hospitalID}`
          return `/by-hospital-id/?${queryString}`
        }
        return 'by-hospital-id'
      }
    }),
    updateTransferOut: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteTransferOut: builder.mutation({
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
  useGetAllTransferOutsQuery, useUpdateTransferOutMutation,
  useDeleteTransferOutMutation, useAddTransferOutMutation, useGetTransferOutQuery, useGetTransferOutByHospitalIDQuery,
  useGetAllTransferOutByPatientIDQuery

} = transferOutApi
