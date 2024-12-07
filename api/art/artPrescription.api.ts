/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type HorizontalLineChartParams } from '@/components/Recharts/HorizontalLineChart'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type ARTPrescriptionInterface } from 'otz-types'

export const artPrescriptionApi = createApi({
  reducerPath: 'artPrescriptionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/art-prescription`
  }),
  endpoints: (builder) => ({
    getAllArtPrescription: builder.query<
    ARTPrescriptionInterface[],
    { hospitalID: string }
    >({
      query: (params) => {
        if (params) {
          const { hospitalID } = params
          let queryString = ''
          // queryString += `date=${date}`
          queryString += `hospitalID=${hospitalID}`
          return `/fetchAll?${queryString}`
        }
        return 'fetchAll'
      }
    }),
    addArtPrescription: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getArtPrescription: builder.query({
      query: (id) => `detail/${id}`
    }),
    getArtPrescriptionByCategory: builder.query<HorizontalLineChartParams[], { hospitalID: string }>({
      query: (params) => {
        if (params) {
          const { hospitalID } = params
          let queryString = ''
          // queryString += `date=${date}`
          queryString += `hospitalID=${hospitalID}`
          return `/by-prescription-category?${queryString}`
        }
        return 'by-prescription-category'
      }
    }),
    deleteArtPrescription: builder.mutation({
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
  useGetAllArtPrescriptionQuery, useAddArtPrescriptionMutation,
  useGetArtPrescriptionQuery, useGetArtPrescriptionByCategoryQuery,
  useDeleteArtPrescriptionMutation
} = artPrescriptionApi
