/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const schoolApi = createApi({
  reducerPath: 'schoolApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/root/schools`
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
    getSchoolSearch: builder.query<any[], { searchQuery: string }>({
      query: (params) => {
        if (params) {
          const { searchQuery } =
            params
          let queryString = ''
          queryString += `searchQuery=${searchQuery}`
          return `/search/?${queryString}`
        }
        return '/search'
      }
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
  useDeleteSchoolMutation, useGetSchoolSearchQuery
} = schoolApi
