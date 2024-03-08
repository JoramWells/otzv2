/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ARTCategoryProps {
  artCategoryDescription: string
  artPhaseID: string
}

export const artRegimenCategoryApi = createApi({
  reducerPath: 'artRegimenCategoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/art-regimen-category'
  }),
  endpoints: (builder) => ({
    getAllArtRegimenCategories: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addArtRegimenCategory: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getArtRegimenCategory: builder.query({
      query: (id) => `detail/${id}`
    }),

    deleteArtRegimenCategory: builder.mutation({
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
  useGetAllArtRegimenCategoriesQuery, useAddArtRegimenCategoryMutation,
  useGetArtRegimenCategoryQuery,
  useDeleteArtRegimenCategoryMutation
} = artRegimenCategoryApi
