/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type ExecuteDisclosureAttributes } from 'otz-types'

export type ExecuteDisclosureInputProps = ExecuteDisclosureAttributes & {
  Patient: { firstName: string, middleName: string, avatar: string | null }
  createdAt: string
}

export const executeDisclosureApi = createApi({
  reducerPath: "executeDisclosureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/execute-disclosure`,
  }),
  endpoints: (builder) => ({
    getAllExecuteDisclosure: builder.query<ExecuteDisclosureInputProps[], void>(
      {
        query: () => "fetchAll",
      }
    ),
    addExecuteDisclosure: builder.mutation({
      query: (response) => ({
        url: "add",
        method: "POST",
        body: response,
      }),
    }),
    getExecuteDisclosure: builder.query<ExecuteDisclosureAttributes, string>({
      query: (id) => `detail/${id}`,
    }),
    getExecuteDisclosureByPatientID: builder.query<
      ExecuteDisclosureAttributes,
      string
    >({
      query: (id) => `by-patient-id/${id}`,
    }),
    getExecuteDisclosureByVisitId: builder.query({
      query: (id) => `by-visit-id/${id}`,
    }),
    getAllExecuteDisclosureByVisitId: builder.query({
      query: (id) => `details/${id}`,
    }),
    updateExecuteDisclosure: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    deleteExecuteDisclosure: builder.mutation({
      query(id) {
        return {
          url: `delete${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllExecuteDisclosureQuery, useAddExecuteDisclosureMutation, useGetAllExecuteDisclosureByVisitIdQuery,
  useGetExecuteDisclosureQuery, useGetExecuteDisclosureByPatientIDQuery, useGetExecuteDisclosureByVisitIdQuery
} = executeDisclosureApi
