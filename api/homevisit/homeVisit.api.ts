import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const homeVisitApi = createApi({
  reducerPath: 'homeVisitApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/home-visit'
  }),
  endpoints: (builder) => ({
    getAllHomeVisits: builder.query({
      query: () => 'fetchAll'
    }),
    addHomeVisit: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getHomeVisit: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateHomeVisit: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteHomeVisit: builder.mutation({
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
  useGetAllHomeVisitsQuery, useAddHomeVisitMutation,
  useGetHomeVisitQuery
} = homeVisitApi
