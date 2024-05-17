/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const patientAllergyApi = createApi({
  reducerPath: 'patientAllergyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/medicalfile/patient-allergies`
  }),
  endpoints: (builder) => ({
    getAllPatientAllergies: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addPatientAllergy: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getPatientAllergy: builder.query({
      query: (id) => `detail/${id}`
    }),

    updatePatientAllergy: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deletePatientAllergy: builder.mutation({
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
  useGetAllPatientAllergiesQuery, useUpdatePatientAllergyMutation,
  useDeletePatientAllergyMutation, useAddPatientAllergyMutation, useGetPatientAllergyQuery
} = patientAllergyApi
