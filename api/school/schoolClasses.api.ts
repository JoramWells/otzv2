/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const schoolClassesApi = createApi({
  reducerPath: 'schoolClassesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5004/school-classes'
  }),
  endpoints: (builder) => ({
    getAllSchoolClasses: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addSchoolClasses: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getSchoolClasses: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateSchoolClasses: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),

    deleteSchoolClasses: builder.mutation({
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
  useGetAllSchoolClassesQuery, useAddSchoolClassesMutation,
  useGetSchoolClassesQuery, useUpdateSchoolClassesMutation,
  useDeleteSchoolClassesMutation
} = schoolClassesApi
