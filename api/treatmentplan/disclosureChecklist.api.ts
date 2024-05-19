import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const disclosureChecklistApi = createApi({
  reducerPath: 'disclosureChecklistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/disclosure-checklist`
  }),
  endpoints: (builder) => ({
    getAllDisclosureChecklist: builder.query({
      query: () => 'fetchAll'
    }),
    addDisclosureChecklist: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getDisclosureChecklist: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateDisclosureChecklist: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteDisclosureChecklist: builder.mutation({
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
  useGetAllDisclosureChecklistQuery, useAddDisclosureChecklistMutation,
  useGetDisclosureChecklistQuery
} = disclosureChecklistApi
