import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const vitalSignsApi = createApi({
  reducerPath: "vitalSignsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/lab/vital-sign",
  }),
  endpoints: (builder) => ({
    getAllVitalSigns: builder.query({
      query: () => "fetchAll",
    }),
    addVitalSign: builder.mutation({
      query: (newUser) => ({
        url: "add",
        method: "POST",
        body: newUser,
      }),
    }),
    getVitalSign: builder.query({
      query: (id) => `detail/${id}`,
    }),
    updateVitalSign: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    deleteVitalSign: builder.mutation({
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
  useGetAllVitalSignsQuery, useAddVitalSignMutation, useGetVitalSignQuery,
  useUpdateVitalSignMutation, useDeleteVitalSignMutation
} = vitalSignsApi
