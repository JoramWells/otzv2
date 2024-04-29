/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const artRegimenApi = createApi({
  reducerPath: "artRegimenApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/root/art-regimen",
  }),
  endpoints: (builder) => ({
    getAllArtRegimen: builder.query<any, void>({
      query: () => "fetchAll",
    }),
    addArtRegimen: builder.mutation({
      query: (newUser) => ({
        url: "add",
        method: "POST",
        body: newUser,
      }),
    }),
    getArtRegimen: builder.query({
      query: (id) => `detail/${id}`,
    }),
    updateCreditPayment: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    deleteArtRegimen: builder.mutation({
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
  useGetAllArtRegimenQuery, useAddArtRegimenMutation,
  useGetArtRegimenQuery,
  useUpdateCreditPaymentMutation, useDeleteArtRegimenMutation
} = artRegimenApi
