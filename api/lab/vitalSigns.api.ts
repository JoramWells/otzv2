/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type VitalSignsInterface } from '@/app/users/reports/triage/columns'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface VitalSignsResponseInterface {
  data: VitalSignsInterface[];
  page: number;
  total: number;
  pageSize: number;
  searchQuery: string;
}

export const vitalSignsApi = createApi({
  reducerPath: 'vitalSignsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/vital-signs`
  }),
  endpoints: (builder) => ({
    getAllVitalSigns: builder.query<VitalSignsResponseInterface, void>({
      query: () => 'fetchAll'
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
