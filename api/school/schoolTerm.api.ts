import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const schoolTermApi = createApi({
  reducerPath: 'schoolTermApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5004/school-terms'
  }),
  endpoints: (builder) => ({
    getAllSchoolTerms: builder.query({
      query: () => 'fetchAll'
    }),
    addSchoolTerm: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getSchoolTerm: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateSchoolTerm: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),

    deleteSchoolTerm: builder.mutation({
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
  useGetAllSchoolTermsQuery, useAddSchoolTermMutation,
  useGetSchoolTermQuery, useUpdateSchoolTermMutation,
  useDeleteSchoolTermMutation
} = schoolTermApi
