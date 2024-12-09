/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type PatientAttributes, type VitalSignsInterface } from 'otz-types'

export interface VitalSignsResponseInterface {
  data: ExtendedVitalSignsInterface[]
  page: number
  total: number
  pageSize: number
  searchQuery: string
}

//
export interface VitalSignsInputParams {
  page?: number
  pageSize?: number
  searchQuery?: string
  hospitalID?: string
}

export type ExtendedVitalSignsInterface = VitalSignsInterface & { Patient: PatientAttributes }

export const vitalSignsApi = createApi({
  reducerPath: 'vitalSignsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/lab/vital-signs`
  }),
  endpoints: (builder) => ({
    getAllVitalSigns: builder.query<VitalSignsResponseInterface, VitalSignsInputParams>({
      query: (params) => {
        if (params) {
          const {
            hospitalID,
            page,
            pageSize,
            searchQuery
          } = params
          let queryString = ''
          // queryString += `date=${date}`
          queryString += `hospitalID=${hospitalID}`
          queryString += `&page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&searchQuery=${searchQuery}`
          return `/fetchAll?${queryString}`
        }
        return 'fetchAll'
      }
    }),
    addVitalSign: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getVitalSign: builder.query({
      query: (id) => `detail/${id}`
    }),
    getVitalSignByPatientID: builder.query({
      query: (id) => `by-patient-id/${id}`
    }),
    getAllVitalSignByPatientID: builder.query({
      query: (id) => `all-details/${id}`
    }),
    getAllVitalSignDetail: builder.query({
      query: (id) => `details/${id}`
    }),
    updateVitalSign: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteVitalSign: builder.mutation({
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
  useGetAllVitalSignsQuery, useAddVitalSignMutation, useGetVitalSignQuery, useGetAllVitalSignDetailQuery,
  useUpdateVitalSignMutation, useDeleteVitalSignMutation, useGetVitalSignByPatientIDQuery, useGetAllVitalSignByPatientIDQuery
} = vitalSignsApi
