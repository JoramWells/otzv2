/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type PaginatedResponseInterface, type DisclosureTrackerInterface, type PatientAttributes, type FullDisclosureAttributes, type PartialDisclosureAttributes } from 'otz-types'

interface AppointmentTypeProps {
  date?: string
  mode?: string
  hospitalID: string
  page: number
  pageSize: number
  searchQuery: string
  hasFullDisclosure: boolean
  hasPartialDisclosure: boolean
}
export type ExtendedDisclosureTracker = DisclosureTrackerInterface & {
  Patient?: PatientAttributes
  FullDisclosure?: FullDisclosureAttributes
  PartialDisclosure: PartialDisclosureAttributes
}
export const disclosureTrackerApi = createApi({
  reducerPath: 'disclosureTrackerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/treatmentplan/disclosure-tracker`
  }),
  endpoints: (builder) => ({
    getAllDisclosureTracker: builder.query<PaginatedResponseInterface<ExtendedDisclosureTracker>, AppointmentTypeProps>({
      query: (params) => {
        if (params) {
          const {
            hospitalID,
            page,
            pageSize,
            searchQuery,
            hasFullDisclosure,
            hasPartialDisclosure
          } = params
          let queryString = ''

          queryString += `page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&searchQuery=${searchQuery}`
          queryString += `&hospitalID=${hospitalID}`
          queryString += `&hasFullDisclosure=${hasFullDisclosure}`
          queryString += `&hasPartialDisclosure=${hasPartialDisclosure}`
          return `/fetchAll/?${queryString}`
        }
        return '/fetchAll'
      }
    }),
    addDisclosureTracker: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getDisclosureTracker: builder.query({
      query: (id) => `detail/${id}`
    }),
    getAllDisclosureTrackerByVisitId: builder.query({
      query: (id) => `details/${id}`
    }),
    getFullDisclosureTrackerByStatus: builder.query<
    Array<{ count: string, status: string, score?: string }>,
    { hospitalID: string }
    >({
      query: (params) => {
        if (params) {
          const { hospitalID } = params
          let queryString = ''

          queryString += `hospitalID=${hospitalID}`
          return `/fetch-by-full-status/?${queryString}`
        }
        return '/fetch-by-full-status'
      }
    }),
    getPartialDisclosureTrackerByStatus: builder.query<
    Array<{ count: string, status: string, score?: string }>,
    { hospitalID: string }
    >({
      query: (params) => {
        if (params) {
          const { hospitalID } = params
          let queryString = ''

          queryString += `hospitalID=${hospitalID}`
          return `/fetch-by-partial-status/?${queryString}`
        }
        return '/fetch-by-partial-status'
      }
    }),
    updateDisclosureTracker: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteDisclosureTracker: builder.mutation({
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
  useGetAllDisclosureTrackerQuery, useAddDisclosureTrackerMutation, useGetAllDisclosureTrackerByVisitIdQuery,
  useGetDisclosureTrackerQuery, useGetFullDisclosureTrackerByStatusQuery, useGetPartialDisclosureTrackerByStatusQuery
} = disclosureTrackerApi
