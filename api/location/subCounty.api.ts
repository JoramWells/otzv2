/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface SubCountyProps {
  id: string
  countyID: string
  subCountyName: string
}

export const subCountyApi = createApi({
  reducerPath: 'subCountyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/root-service/sub-counties'
  }),
  endpoints: (builder) => ({
    getAllSubCounties: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addSubCounty: builder.mutation<string, SubCountyProps>({
      query: (newSubCounty: SubCountyProps) => ({
        url: 'add',
        method: 'POST',
        body: newSubCounty
      })
    }),
    getSubCounty: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateSubCounty: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteSubCounty: builder.mutation({
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
  useGetAllSubCountiesQuery, useAddSubCountyMutation,
  useGetSubCountyQuery,
  useUpdateSubCountyMutation, useDeleteSubCountyMutation
} = subCountyApi
