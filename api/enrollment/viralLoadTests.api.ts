/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type PatientAttributes, type ViralLoadInterface } from 'otz-types'

export type ExtendedViralLoadInterface = ViralLoadInterface & {
  Patient: PatientAttributes
}

export interface ViralLoadResponseInterface {
  data: ExtendedViralLoadInterface[];
  page: number;
  total: number;
  pageSize: number;
  searchQuery: string;
}

export interface ViralLoadInputParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  hospitalID?: string;
}

export const viralLoadApi = createApi({
  reducerPath: 'viralLoadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/viral-load-tests`
  }),
  endpoints: (builder) => ({
    getAllViralLoadTests: builder.query<
    ViralLoadResponseInterface,ViralLoadInputParams
    >({
      query: (params) => {
        if (params) {
          const { hospitalID, page,pageSize, searchQuery } = params
          let queryString = ''
          // queryString += `date=${date}`
          queryString += `hospitalID=${hospitalID}`
                    queryString += `&page=${page}`;
                    queryString += `&pageSize=${pageSize}`;
                    queryString += `&searchQuery=${searchQuery}`;
          return `/fetchAll?${queryString}`
        }
        return 'fetchAll'
      }
    }),
    getAllVlCategories: builder.query<any, { hospitalID: string }>({
      query: (params) => {
        if (params) {
          const { hospitalID } = params
          let queryString = ''
          // queryString += `date=${date}`
          queryString += `hospitalID=${hospitalID}`
          return `/fetchAllVLCategory?${queryString}`
        }
        return 'fetchAllVLCategory'
      }
    }),
    getVLSuppressionRate: builder.query<any, { hospitalID: string, startDate: string, endDate: string }>({
      query: (params) => {
        if (params) {
          const { hospitalID, endDate, startDate } = params
          let queryString = ''
          // queryString += `date=${date}`
          queryString += `hospitalID=${hospitalID}`
          queryString += `&startDate=${startDate}`
          queryString += `&endDate=${endDate}`
          return `/suppression-rate?${queryString}`
        }
        return 'suppression-rate'
      }
    }),
    addViralLoadTest: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getViralLoadTest: builder.query({
      query: (id) => `detail/${id}`
    }),
    getAllViralLoadByPatientID: builder.query({
      query: (id) => `details/${id}`
    }),
    getViralLoadTestByPatientVisitID: builder.query({
      query: (id) => `detail-by-visit/${id}`
    }),
    getOTZPatientEnrollment: builder.query({
      query: (id) => `patient/${id}`
    }),
    updateViralLoadTest: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteViralLoadTest: builder.mutation({
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
  useGetAllViralLoadTestsQuery,
  useUpdateViralLoadTestMutation,
  useGetAllViralLoadByPatientIDQuery,
  useDeleteViralLoadTestMutation,
  useAddViralLoadTestMutation,
  useGetViralLoadTestQuery,
  useGetOTZPatientEnrollmentQuery,
  useGetAllVlCategoriesQuery,
  useGetViralLoadTestByPatientVisitIDQuery,
  useGetVLSuppressionRateQuery
} = viralLoadApi
