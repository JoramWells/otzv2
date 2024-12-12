/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type PatientAttributes, type PartialDisclosureAttributes } from 'otz-types'

interface PartialDisclosurePostInterface {
  hospitalID: string
  page: number
  pageSize: number
  searchQuery: string

}

export type ExtendedPartialDisclosureInterface = PartialDisclosureAttributes & {
  Patient: PatientAttributes
}

export interface PartialDisclosureResponseInterface {
  data: ExtendedPartialDisclosureInterface[]
  page: number
  total: number
  pageSize: number
  searchQuery: string
}

interface PartialDisclosureScoreCategoryInterface {
  id: string
  count?: string | number
  status?: string
  latestCreatedAt?: string | Date
}

export const partialDisclosureApi = createApi({
  reducerPath: 'partialDisclosureApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/treatmentplan/partial-disclosure`
  }),
  endpoints: (builder) => ({
    getAllPartialDisclosure: builder.query<
    PartialDisclosureResponseInterface,
    PartialDisclosurePostInterface
    >({
      query: (params) => {
        if (params) {
          const { hospitalID, page, pageSize, searchQuery } = params
          let queryString = ''

          queryString += `page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&searchQuery=${searchQuery}`
          queryString += `&hospitalID=${hospitalID}`
          return `/fetchAll/?${queryString}`
        }
        return '/fetchAll'
      }
    }),
    addPartialDisclosure: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getPartialDisclosure: builder.query({
      query: (id) => `detail/${id}`
    }),
    getPartialDisclosureByPatientID: builder.query({
      query: (id) => `by-patient-id/${id}`
    }),
    getAllPartialDisclosureByVisitId: builder.query({
      query: (id) => `details/${id}`
    }),
    updatePartialDisclosure: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    getPartialDisclosureCategoryScore: builder.query<
    PartialDisclosureScoreCategoryInterface[],
    { hospitalID: string }
    >({
      query: (params) => {
        if (params) {
          const { hospitalID } = params
          let queryString = ''

          queryString += `hospitalID=${hospitalID}`
          return `/score/?${queryString}`
        }
        return '/score'
      }
    }),
    deletePartialDisclosure: builder.mutation({
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
  useGetAllPartialDisclosureQuery, useAddPartialDisclosureMutation, useGetAllPartialDisclosureByVisitIdQuery,
  useGetPartialDisclosureQuery, useGetPartialDisclosureByPatientIDQuery, useGetPartialDisclosureCategoryScoreQuery
} = partialDisclosureApi
