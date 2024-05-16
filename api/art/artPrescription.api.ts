/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const artPrescriptionApi = createApi({
  reducerPath: 'artPrescriptionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/art-prescription`
  }),
  endpoints: (builder) => ({
    getAllArtPrescription: builder.query<any, void>({
      query: () => 'fetchAll'
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
  useGetArtPrescriptionQuery,
  useDeleteArtPrescriptionMutation
} = artPrescriptionApi
