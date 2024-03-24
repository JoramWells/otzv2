/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ArtProps {
  patientID: string
  artID: string
  regimenLineID: string
  switchDate: string
  switchReasonID: string
}

export const artRegimenSwitchApi = createApi({
  reducerPath: 'artRegimenSwitchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/root-service/art-regimen-switch'
  }),
  endpoints: (builder) => ({
    getAllArtRegimenSwitch: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addArtRegimenSwitch: builder.mutation<string, ArtProps>({
      query: (newUser: ArtProps) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getArtRegimenSwitch: builder.query({
      query: (id) => `detail/${id}`
    }),
    deleteArtRegimenSwitch: builder.mutation({
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
  useGetAllArtRegimenSwitchQuery, useAddArtRegimenSwitchMutation,
  useGetArtRegimenSwitchQuery,
  useDeleteArtRegimenSwitchMutation
} = artRegimenSwitchApi
