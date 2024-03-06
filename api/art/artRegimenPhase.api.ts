import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const artRegimenPhaseApi = createApi({
  reducerPath: 'artRegimenPhaseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/art-regimen-phase'
  }),
  endpoints: (builder) => ({
    getAllArtRegimenPhase: builder.query({
      query: () => 'fetchAll'
    }),
    addArtRegimenPhase: builder.mutation({
      query: (newUser) => ({
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
