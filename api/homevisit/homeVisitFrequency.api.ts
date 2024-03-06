import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const homeVisitFrequencyApi = createApi({
  reducerPath: 'homeVisitFrequencyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/home-visit-frequency'
  }),
  endpoints: (builder) => ({
    getAllHomeVisitFrequencies: builder.query({
      query: () => 'fetchAll'
    }),
    addHomeVisitFrequency: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getHomeVisitFrequency: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateHomeVisitFrequency: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteHomeVisitFrequency: builder.mutation({
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
  useGetAllHomeVisitFrequenciesQuery, useAddHomeVisitFrequencyMutation,
  useGetHomeVisitFrequencyQuery
} = homeVisitFrequencyApi
