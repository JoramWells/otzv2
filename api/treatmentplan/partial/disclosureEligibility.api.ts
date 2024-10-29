import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type ChildDisclosureEligibilityAttributes } from 'otz-types'

export const disclosureEligibilityApi = createApi({
  reducerPath: 'disclosureEligibilityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/disclosure-eligibility`
  }),
  endpoints: (builder) => ({
    getAllDisclosureEligibility: builder.query({
      query: () => 'fetchAll'
    }),
    addDisclosureEligibility: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getDisclosureEligibility: builder.query<ChildDisclosureEligibilityAttributes, string>({
      query: (id) => `detail/${id}`
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
  useGetDisclosureEligibilityQuery
} = disclosureEligibilityApi
