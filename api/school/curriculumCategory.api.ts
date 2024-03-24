/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const curriculumCategoryApi = createApi({
  reducerPath: 'CurriculumCategoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/school/school-category'
  }),
  endpoints: (builder) => ({
    getAllCurriculumCategories: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addCurriculumCategory: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getCurriculumCategory: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateCurriculumCategory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),

    deleteCurriculumCategory: builder.mutation({
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
  useGetAllCurriculumCategoriesQuery, useAddCurriculumCategoryMutation,
  useGetCurriculumCategoryQuery, useUpdateCurriculumCategoryMutation,
  useDeleteCurriculumCategoryMutation
} = curriculumCategoryApi
