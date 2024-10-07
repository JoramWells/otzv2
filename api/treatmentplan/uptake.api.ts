/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type ExtendedAdherenceAttributes } from '@/app/pill-box/reminder/morningColumn'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// interface AppointmentProps {
//   patientsDueMorning?: boolean
// }

export const pillDailyUptakeApi = createApi({
  reducerPath: 'pillDailyUptakeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/daily-uptake`
  }),
  endpoints: (builder) => ({
    getAllPillDailyUptake: builder.query<ExtendedAdherenceAttributes[], void>({
      query: (params) => {
        // if (params) {
        //   const { patientsDueMorning } = params
        //   let queryString = ''
        //   queryString += `patientsDueMorning=${patientsDueMorning}`
        //   return `/fetchAll?${queryString}`
        // }
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
        url: `edit/${id}?time=morning`,
        method: 'PUT',
        body: patch
      })
    }),
    updatePillUptakeEveningStatus: builder.mutation<void, any>({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}?time=evening`,
        method: 'PUT',
        body: patch
      })
    }),
    deletePillDailyUptake: builder.mutation({
      query (id) {
        return {
          url: `delete/${id}`,
          method: 'DELETE'
        }
      }
    })
  })
})

export const {
  useGetAllPillDailyUptakeQuery, useAddPillDailyUptakeMutation, useUpdatePillUptakeEveningStatusMutation,
  useGetPillDailyUptakeQuery, useUpdatePillDailyUptakeMutation, useDeletePillDailyUptakeMutation,
  useGetPillDailyUptakeCountQuery
} = pillDailyUptakeApi
