/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ARTCategoryProps {
  artCategoryDescription: string
  artPhaseID: string
}

export const vlJustificationApi = createApi({
  reducerPath: 'vlJustificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/lab/vl-justification`
  }),
  endpoints: (builder) => ({
    getAllVlJustification: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addVLJustification: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getVLJustification: builder.query({
      query: (id) => `detail/${id}`
    }),

    deleteVLJustification: builder.mutation({
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
  useGetAllVlJustificationQuery, useAddVLJustificationMutation,
  useGetVLJustificationQuery,
  useDeleteVLJustificationMutation
} = vlJustificationApi
