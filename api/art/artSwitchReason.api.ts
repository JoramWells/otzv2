/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ArtProps {
  reason: string
}

export const artSwitchReasonApi = createApi({
  reducerPath: 'artSwitchReasonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/art-switch-reason'
  }),
  endpoints: (builder) => ({
    getAllArtSwitchReasons: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addArtSwitchReason: builder.mutation<string, ArtProps>({
      query: (newUser: ArtProps) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getArtSwitchReason: builder.query({
      query: (id) => `detail/${id}`
    }),
    deleteArtSwitchReason: builder.mutation({
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
  useGetAllArtSwitchReasonsQuery, useAddArtSwitchReasonMutation,
  useGetArtSwitchReasonQuery,
  useDeleteArtSwitchReasonMutation
} = artSwitchReasonApi
