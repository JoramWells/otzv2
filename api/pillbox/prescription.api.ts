/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type PatientAttributes, type PrescriptionInterface } from 'otz-types'

export type ExtendedPrescriptionInterface = PrescriptionInterface & { Patient: PatientAttributes }

interface PrescriptionInputProps {
  mode?: string
  hospitalID: string
  page: number
  pageSize: number
  searchQuery: string
  frequency: string
  status: string
  line: string
  regimen: string
}

export interface PrescriptionResponseInterface {
  data: ExtendedPrescriptionInterface[]
  page: number
  total: number
  pageSize: number
  searchQuery: string
}

export const prescriptionApi = createApi({
  reducerPath: 'prescriptionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/prescription`
  }),
  endpoints: (builder) => ({
    getAllPrescriptions: builder.query<PrescriptionResponseInterface, PrescriptionInputProps>({
      query: (params) => {
        if (params) {
          const { mode, hospitalID, page, pageSize, searchQuery, frequency, line, regimen, status } = params
          let queryString = ''
          queryString += `mode=${mode}`
          queryString += `&page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&searchQuery=${searchQuery}`
          queryString += `&frequency=${frequency}`
          queryString += `&line=${line}`
          queryString += `&regimen=${regimen}`
          queryString += `&status=${status}`
          queryString += `&hospitalID=${hospitalID}`
          return `/fetchAll?${queryString}`
        }
        return 'fetchAll'
      }
    }),
    addPrescription: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getPrescription: builder.query<PrescriptionInterface, string>({
      query: (id) => `detail/${id}`
    }),
    getPrescriptionDetail: builder.query<PrescriptionInterface | undefined, string>({
      query: (id) => `details/${id}`
    }),
    updatePrescription: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deletePrescription: builder.mutation({
      query (id) {
        return {
          url: `delete/${id}`,
          method: 'DELETE'
        }
      }
    }),
    getFacilityAdherence: builder.query<any, void>({
      query: () => 'facility-adherence'
    })
  })
})

export const {
  useGetAllPrescriptionsQuery, useUpdatePrescriptionMutation, useGetPrescriptionDetailQuery, useGetFacilityAdherenceQuery,
  useDeletePrescriptionMutation, useAddPrescriptionMutation, useGetPrescriptionQuery
} = prescriptionApi
