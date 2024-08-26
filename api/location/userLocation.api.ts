/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userLocationApi = createApi({
  reducerPath: 'userLocationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/lab/user-location`
  }),
  endpoints: (builder) => ({
    getAllUserLocations: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addUserLocation: builder.mutation({
      query: (body) => ({
        url: 'add',
        method: 'POST',
        body
      })
    }),
    getUserLocation: builder.query({
      query: (id) => `details/${id}`
    }),
    updateUserLocation: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteUserLocation: builder.mutation({
      query (id) {
        return {
          url: `delete${id}`,
          method: 'DELETE'
        }
      }
    })
  })
})

export const { useGetAllUserLocationsQuery, useAddUserLocationMutation, useGetUserLocationQuery } = userLocationApi
