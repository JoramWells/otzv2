import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const enhancedAdherenceApi = createApi({
  reducerPath: 'enhancedAdherenceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/enhanced-adherence`
  }),
  endpoints: (builder) => ({
    getAllEnhancedAdherence: builder.query({
      query: () => 'fetchAll'
    }),
    addEnhancedAdherence: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getEnhancedAdherence: builder.query({
      query: (id) => `detail/${id}`
    }),
    getAllEnhancedAdherenceByVisitId: builder.query({
      query: (id) => `details/${id}`
    }),
    updateEnhancedAdherence: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteEnhancedAdherence: builder.mutation({
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
  useGetAllEnhancedAdherenceQuery, useAddEnhancedAdherenceMutation, useGetAllEnhancedAdherenceByVisitIdQuery,
  useGetEnhancedAdherenceQuery
} = enhancedAdherenceApi
