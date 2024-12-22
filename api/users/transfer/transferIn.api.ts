/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { type DefaultParamsInterface } from '@/dtos/PaginatedResponseInterface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type PaginatedResponseInterface, type TransferInInterface } from 'otz-types'

export const transferInApi = createApi({
  reducerPath: 'transferInApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/users/transfer-in`
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
    getAllTransferIns: builder.query<PaginatedResponseInterface<TransferInInterface>, DefaultParamsInterface>({
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

    addTransferIn: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getTransferIn: builder.query<TransferInInterface[], string>({
      query: (id) => `detail/${id}`
    }),
    getTransferInByHospitalID: builder.query<any, { hospitalID: string }>({
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
    updateTransferIn: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteTransferIn: builder.mutation({
      query (id) {
        return {
          url: `delete/${id}`,
          method: 'DELETE'
        }
      }
    }),
    verifyTransferIn: builder.mutation<TransferInInterface, { id: string, userID: string, hospitalID: string }>({
      query (params) {
        const { id, userID, hospitalID } = params
        // let queryString = ''
        // queryString += `hospitalID=${hospitalID}`
        // queryString += `userID=${userID}`
        return {
          url: `verify-transfer-in/${id}`,
          method: 'PUT',
          body: { userID, hospitalID }
        }
      }
    })
  })
})

export const {
  useGetAllTransferInsQuery, useUpdateTransferInMutation,
  useDeleteTransferInMutation, useAddTransferInMutation, useGetTransferInQuery, useGetTransferInByHospitalIDQuery,
  useVerifyTransferInMutation

} = transferInApi
