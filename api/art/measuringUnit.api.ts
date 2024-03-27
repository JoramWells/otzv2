/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const measuringUnitApi = createApi({
  reducerPath: 'measuringUnitApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/root-service/measuring-unit'
  }),
  endpoints: (builder) => ({
    getAllMeasuring: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addMeasuringUnit: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getMeasuringUnit: builder.query({
      query: (id) => `detail/${id}`
    }),

    deleteMeasuring: builder.mutation({
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
  useGetAllMeasuringQuery, useAddMeasuringUnitMutation,
  useGetMeasuringUnitQuery,
  useDeleteMeasuringMutation
} = measuringUnitApi
