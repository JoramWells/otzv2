/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type ARTPrescriptionInterface, type OTZEnrollmentsInterface, type PatientAttributes, type UserInterface, type ViralLoadInterface } from 'otz-types'

export type ExtendedOTZEnrollment = OTZEnrollmentsInterface & {
  ViralLoad: ViralLoadInterface
  ARTPrescription: ARTPrescriptionInterface
  Patient: PatientAttributes
  User: UserInterface
}

export const otzEnrollmentApi = createApi({
  reducerPath: 'otzEnrollmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/otz-enrollment`
  }),
  endpoints: (builder) => ({
    getAllOTZEnrollments: builder.query<
    any,
    { hospitalID: string }
    >({
      query: (params) => {
        if (params) {
          const { hospitalID } = params
          let queryString = ''
          queryString += `hospitalID=${hospitalID}`
          return `/fetchAll?${queryString}`
        }
        return 'fetchAll'
      }
    }),
    addOTZEnrollment: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getOTZEnrollment: builder.query<ExtendedOTZEnrollment, string>({
      query: (id) => `detail/${id}`
    }),
    getOTZPatientEnrollment: builder.query({
      query: (id) => `patient/${id}`
    }),
    updateOTZEnrollment: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteOTZEnrollment: builder.mutation({
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
  useGetAllOTZEnrollmentsQuery, useUpdateOTZEnrollmentMutation,
  useDeleteOTZEnrollmentMutation, useAddOTZEnrollmentMutation, useGetOTZEnrollmentQuery,
  useGetOTZPatientEnrollmentQuery
} = otzEnrollmentApi
