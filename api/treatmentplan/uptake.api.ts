/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface AppointmentProps {
  patientsDueMorning?: boolean
}

export const pillDailyUptakeApi = createApi({
  reducerPath: 'pillDailyUptakeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/root-service/daily-uptake'
  }),
  endpoints: (builder) => ({
    getAllPillDailyUptake: builder.query<any, AppointmentProps>({
      query: (params) => {
        if (params) {
          const { patientsDueMorning } = params
          let queryString = ''
          queryString += `patientsDueMorning=${patientsDueMorning}`
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
    getPillDailyUptakeCount: builder.query({
      query: () => 'dailyUptakeCount'
    }),
    getPillDailyUptake: builder.query({
      query: (id) => `detail/${id}`
    }),
    updatePillDailyUptake: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
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
  useGetPillDailyUptakeQuery, useUpdatePillDailyUptakeMutation,
  useGetPillDailyUptakeCountQuery
} = pillDailyUptakeApi
