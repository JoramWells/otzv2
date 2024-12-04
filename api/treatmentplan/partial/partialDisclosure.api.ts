import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const partialDisclosureApi = createApi({
  reducerPath: 'partialDisclosureApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/partial-disclosure`
  }),
  endpoints: (builder) => ({
    getAllPartialDisclosure: builder.query({
      query: () => 'fetchAll'
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
  useGetPartialDisclosureQuery, useGetPartialDisclosureByPatientIDQuery
} = partialDisclosureApi
