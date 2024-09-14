/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type HomeVisitConfigAttributes } from 'otz-types'

export type HomVisitConfigInputProps = HomeVisitConfigAttributes & {
  HomeVisitReason: {
    homeVisitReasonDescription: string
  }
  PatientVisit: {
    Patient: {
      id: string
      firstName: string
      middleName: string
      isImportant: boolean
    }
  }
  patient: {
    firstName: string
    middleName: string
  }
}

export const homeVisitConfigApi = createApi({
  reducerPath: 'homeVisitConfigApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/home-visit-config`
  }),
  endpoints: (builder) => ({
    getAllHomeVisitConfig: builder.query<HomVisitConfigInputProps[], void>({
      query: () => 'fetchAll'
    }),
    addHomeVisitConfig: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getHomeVisitConfig: builder.query<HomVisitConfigInputProps, string>({
      query: (id) => `detail/${id}`
    }),
    updateHomeVisitConfig: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteHomeVisitConfig: builder.mutation({
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
  useGetAllHomeVisitConfigQuery, useAddHomeVisitConfigMutation,
  useGetHomeVisitConfigQuery
} = homeVisitConfigApi
