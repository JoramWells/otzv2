import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const vitalSignsApi = createApi({
  reducerPath: 'vitalSignsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/lab/vital-sign`
  }),
  endpoints: (builder) => ({
    getAllVitalSigns: builder.query({
      query: () => 'fetchAll'
    }),
    addVitalSign: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getVitalSign: builder.query({
      query: (id) => `detail/${id}`
    }),
    getVitalSignByPatientID: builder.query({
      query: (id) => `patient-detail/${id}`
    }),
    getAllVitalSignDetail: builder.query({
      query: (id) => `details/${id}`
    }),
    updateVitalSign: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteVitalSign: builder.mutation({
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
  useGetAllVitalSignsQuery, useAddVitalSignMutation, useGetVitalSignQuery, useGetAllVitalSignDetailQuery,
  useUpdateVitalSignMutation, useDeleteVitalSignMutation, useGetVitalSignByPatientIDQuery
} = vitalSignsApi
