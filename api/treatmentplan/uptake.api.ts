/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pillDailyUptakeApi = createApi({
  reducerPath: 'pillDailyUptakeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/root-service/daily-uptake'
  }),
  endpoints: (builder) => ({
    getAllPillDailyUptake: builder.query({
      query: (params) => {
        if (params) {
          const { medicationsDue } = params
          let queryString = ''
          queryString += `medicationsDue=${medicationsDue}`
          return `/fetchAll?${queryString}`
        }
        return 'fetchAll'
      }
    }),

    addPillDailyUptake: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getPillDailyUptake: builder.query({
      query: (id) => `detail/${id}`
    }),
    updatePillDailyUptake: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deletePillDailyUptake: builder.mutation({
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
  useGetAllPillDailyUptakeQuery, useAddPillDailyUptakeMutation,
  useGetPillDailyUptakeQuery
} = pillDailyUptakeApi
