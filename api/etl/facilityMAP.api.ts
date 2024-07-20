/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface FacilityMapProps {
  id?: string
  FacilityMapDescription: string
}

export const facilityMAPApi = createApi({
  reducerPath: 'facilityMAPApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/articles/facility-map`
  }),
  endpoints: (builder) => ({
    getAllFacilityMap: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addFacilityMap: builder.mutation<string, void>({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getFacilityMap: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateFacilityMap: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteFacilityMap: builder.mutation({
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
  useGetAllFacilityMapQuery, useAddFacilityMapMutation,
  useGetFacilityMapQuery,
  useUpdateFacilityMapMutation, useDeleteFacilityMapMutation
} = facilityMAPApi
