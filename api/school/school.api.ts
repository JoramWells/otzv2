/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const schoolApi = createApi({
  reducerPath: 'schoolApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/school/schools'
  }),
  endpoints: (builder) => ({
    getAllSchools: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addSchool: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getSchool: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateSchool: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),

    deleteSchool: builder.mutation({
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
  useGetAllSchoolsQuery, useAddSchoolMutation,
  useGetSchoolQuery, useUpdateSchoolMutation,
  useDeleteSchoolMutation
} = schoolApi
