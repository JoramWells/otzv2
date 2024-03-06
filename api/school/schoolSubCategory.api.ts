import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const schoolSubCategoryApi = createApi({
  reducerPath: 'schoolSubCategoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5004/school-sub-category'
  }),
  endpoints: (builder) => ({
    getAllSchoolSubCategories: builder.query({
      query: () => 'fetchAll'
    }),
    addSchoolSubCategory: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getSchoolSubCategory: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateSchoolSubCategory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),

    deleteSchoolSubCategory: builder.mutation({
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
  useGetAllSchoolSubCategoriesQuery, useAddSchoolSubCategoryMutation,
  useGetSchoolSubCategoryQuery, useUpdateSchoolSubCategoryMutation,
  useDeleteSchoolSubCategoryMutation
} = schoolSubCategoryApi
