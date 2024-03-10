/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface OccupationProps {
  id: string
  occupationDescription: string
}

export const occupationApi = createApi({
  reducerPath: 'occupationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/occupations'
  }),
  endpoints: (builder) => ({
    getAllOccupation: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addOccupation: builder.mutation<string, OccupationProps>({
      query: (newUser: OccupationProps) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getOccupation: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateOccupation: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteOccupation: builder.mutation({
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
  useGetAllOccupationQuery, useAddOccupationMutation,
  useGetOccupationQuery,
  useUpdateOccupationMutation, useDeleteOccupationMutation
} = occupationApi
