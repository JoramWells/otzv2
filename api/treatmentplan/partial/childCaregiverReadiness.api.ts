/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type ChildCaregiverReadinessAttributes } from 'otz-types'

export type ChildCaregiverReadinessProps = ChildCaregiverReadinessAttributes & {
  Patient: {
    firstName: string
    middleName: string
    avatar: string | null
  }
  createdAt: string
}

export const childCaregiverReadinessApi = createApi({
  reducerPath: 'childCaregiverReadinessApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/treatmentplan/child-readiness`
  }),
  endpoints: (builder) => ({
    getAllChildCaregiverReadiness: builder.query<
    ChildCaregiverReadinessProps[],
    void
    >({
      query: () => 'fetchAll'
    }),
    addChildCaregiverReadiness: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getChildCaregiverReadiness: builder.query<
    ChildCaregiverReadinessProps,
    string
    >({
      query: (id) => `detail/${id}`
    }),
    getChildCaregiverReadinessByPatientID: builder.query<
    ChildCaregiverReadinessAttributes,
    string
    >({
      query: (id) => `by-patient-id/${id}`
    }),
    getChildCaregiverReadinessByVisitId: builder.query({
      query: (id) => `by-visit-id/${id}`
    }),
    getAllChildCaregiverReadinessByVisitId: builder.query({
      query: (id) => `details/${id}`
    }),
    updateChildCaregiverReadiness: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteChildCaregiverReadiness: builder.mutation({
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
  useGetAllChildCaregiverReadinessQuery, useAddChildCaregiverReadinessMutation, useGetAllChildCaregiverReadinessByVisitIdQuery,
  useGetChildCaregiverReadinessQuery, useGetChildCaregiverReadinessByPatientIDQuery, useGetChildCaregiverReadinessByVisitIdQuery
} = childCaregiverReadinessApi
