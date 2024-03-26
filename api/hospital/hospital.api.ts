/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const hospitalApi = createApi({
  reducerPath: 'hospitalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/hospital'
  }),
  endpoints: (builder) => ({
    getAllHospitals: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addHospitals: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getHospital: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateHospital: builder.mutation<void, any>({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteHospital: builder.mutation({
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
  useGetAllHospitalsQuery, useAddHospitalsMutation, useGetHospitalQuery, useUpdateHospitalMutation,
  useDeleteHospitalMutation
} = hospitalApi
