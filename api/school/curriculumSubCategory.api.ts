/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const curriculumSubCategoryApi = createApi({
  reducerPath: 'curriculumSubCategoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/school/school-sub-category'
  }),
  endpoints: (builder) => ({
    getAllSchoolSubCurriculums: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addSchoolSubCurriculum: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getSchoolSubCurriculum: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateSchoolSubCurriculum: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),

    deleteSchoolSubCurriculum: builder.mutation({
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
  useGetAllSchoolSubCurriculumsQuery, useAddSchoolSubCurriculumMutation,
  useGetSchoolSubCurriculumQuery, useUpdateSchoolSubCurriculumMutation,
  useDeleteSchoolSubCurriculumMutation
} = curriculumSubCategoryApi
