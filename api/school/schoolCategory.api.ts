import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const schoolCategoryApi = createApi({
  reducerPath: 'schoolCategoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5004/school-category'
  }),
  endpoints: (builder) => ({
    getAllSchoolCategories: builder.query({
      query: () => 'fetchAll'
    }),
    addSchoolCategory: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getSchoolCategory: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateSchoolCategory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),

    deleteSchoolCategory: builder.mutation({
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
  useGetAllSchoolCategoriesQuery, useAddSchoolCategoryMutation,
  useGetSchoolCategoryQuery, useUpdateSchoolCategoryMutation,
  useDeleteSchoolCategoryMutation
} = schoolCategoryApi
