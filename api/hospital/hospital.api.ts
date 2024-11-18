/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type HospitalAttributes } from 'otz-types'

export interface LocationProps {
  location?: {
    county: string
    subCounty: string
    ward: string
  }
}

export type ExtendedHospitalInterface = HospitalAttributes & LocationProps

export const hospitalApi = createApi({
  reducerPath: 'hospitalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/root/hospital`
  }),
  endpoints: (builder) => ({
    getAllHospitals: builder.query<ExtendedHospitalInterface[], void>({
      query: () => 'fetchAll'
    }),
    addHospitals: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getHospital: builder.query<ExtendedHospitalInterface, string>({
      query: (id) => `detail/${id}`
    }),
    updateHospital: builder.mutation<void, any>({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    updateHospitalLocation: builder.mutation<void, any>({
      query: ({ id, ...patch }) => ({
        url: `update-hospital-location/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteHospital: builder.mutation({
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
  useGetAllHospitalsQuery, useAddHospitalsMutation, useGetHospitalQuery, useUpdateHospitalMutation,
  useDeleteHospitalMutation, useUpdateHospitalLocationMutation
} = hospitalApi
