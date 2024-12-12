/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type PatientAttributes, type FullDisclosureAttributes } from 'otz-types'

interface FullDisclosurePostInterface {
  hospitalID: string
  page: number
  pageSize: number
  searchQuery: string

}

interface FullDisclosureScoreCategoryInterface {
  id: string
  count?: string | number
  status?: string
  latestCreatedAt?: string | Date
}

export type ExtendedFullDisclosureInterface = FullDisclosureAttributes & {
  Patient: PatientAttributes
}

export interface FullDisclosureResponseInterface {
  data: ExtendedFullDisclosureInterface[]
  page: number
  total: number
  pageSize: number
  searchQuery: string
}

export const fullDisclosureApi = createApi({
  reducerPath: 'fullDisclosureApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/full-disclosure`
  }),
  endpoints: (builder) => ({
    getAllFullDisclosure: builder.query<
    FullDisclosureResponseInterface,
    FullDisclosurePostInterface
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
    addFullDisclosure: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getFullDisclosure: builder.query({
      query: (id) => `detail/${id}`
    }),
    getFullDisclosureByPatientID: builder.query({
      query: (id) => `by-patient-id/${id}`
    }),
    getAllFullDisclosureByVisitId: builder.query({
      query: (id) => `details/${id}`
    }),
    updateFullDisclosure: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    getFullDisclosureCategoryScore: builder.query<
    FullDisclosureScoreCategoryInterface[],
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
    deleteFullDisclosure: builder.mutation({
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
  useGetAllFullDisclosureQuery, useAddFullDisclosureMutation, useGetAllFullDisclosureByVisitIdQuery,
  useGetFullDisclosureQuery, useGetFullDisclosureByPatientIDQuery, useGetFullDisclosureCategoryScoreQuery
} = fullDisclosureApi
