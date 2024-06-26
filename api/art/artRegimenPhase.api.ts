/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ArtProps {
  artPhaseDescription: string
}

export const artRegimenPhaseApi = createApi({
  reducerPath: 'artRegimenPhaseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/art-regimen-phase`
  }),
  endpoints: (builder) => ({
    getAllArtRegimenPhase: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addArtRegimenPhase: builder.mutation<string, ArtProps>({
      query: (newUser: ArtProps) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getArtRegimenPhase: builder.query({
      query: (id) => `detail/${id}`
    }),
    deleteArtRegimenPhase: builder.mutation({
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
  useGetAllArtRegimenPhaseQuery, useAddArtRegimenPhaseMutation,
  useGetArtRegimenPhaseQuery,
  useDeleteArtRegimenPhaseMutation
} = artRegimenPhaseApi
