/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type ChildDisclosureEligibilityAttributes } from 'otz-types'

export type ChildDisclosureEligibilityProps = ChildDisclosureEligibilityAttributes & {
  Patient: {
    firstName: string
    middleName: string
    avatar: string | null
  }
  createdAt: string
}

export const disclosureEligibilityApi = createApi({
  reducerPath: 'disclosureEligibilityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/disclosure-eligibility`
  }),
  endpoints: (builder) => ({
    getAllDisclosureEligibility: builder.query<
    ChildDisclosureEligibilityProps[],
    void
    >({
      query: () => 'fetchAll'
    }),
    addDisclosureEligibility: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getDisclosureEligibility: builder.query<
    ChildDisclosureEligibilityProps,
    string
    >({
      query: (id) => `detail/${id}`
    }),
    getDisclosureEligibilityByPatientID: builder.query<
    ChildDisclosureEligibilityProps,
    string
    >({
      query: (id) => `by-patient-id/${id}`
    }),
    getDisclosureEligibilityByVisitID: builder.query<
    ChildDisclosureEligibilityProps,
    string
    >({
      query: (id) => `by-visit-id/${id}`
    }),
    getAllDisclosureEligibilityByVisitId: builder.query({
      query: (id) => `details/${id}`
    }),
    updateDisclosureEligibility: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteDisclosureEligibility: builder.mutation({
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
  useGetAllDisclosureEligibilityQuery, useAddDisclosureEligibilityMutation, useGetAllDisclosureEligibilityByVisitIdQuery,
  useGetDisclosureEligibilityQuery, useGetDisclosureEligibilityByPatientIDQuery, useGetDisclosureEligibilityByVisitIDQuery
} = disclosureEligibilityApi
