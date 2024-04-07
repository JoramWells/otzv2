import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const caregiverApi = createApi({
  reducerPath: 'caregiverApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/patient-service/caregiver'
  }),
  endpoints: (builder) => ({
    getAllCaregivers: builder.query({
      query: () => 'fetchAll'
    }),
    addCaregiver: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getCaregiver: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateCaregiver: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteCaregiver: builder.mutation({
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
  useGetAllCaregiversQuery, useUpdateCaregiverMutation,
  useDeleteCaregiverMutation, useAddCaregiverMutation, useGetCaregiverQuery
} = caregiverApi
