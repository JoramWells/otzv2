/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const schoolTermHolidayApi = createApi({
  reducerPath: 'schoolTermHolidayApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/school/school-term-holidays'
  }),
  endpoints: (builder) => ({
    getAllSchoolTermHolidays: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addSchoolTermHoliday: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getSchoolTermHoliday: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateSchoolTermHoliday: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),

    deleteSchoolTermHoliday: builder.mutation({
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
  useGetAllSchoolTermHolidaysQuery, useAddSchoolTermHolidayMutation,
  useGetSchoolTermHolidayQuery, useUpdateSchoolTermHolidayMutation,
  useDeleteSchoolTermHolidayMutation
} = schoolTermHolidayApi
