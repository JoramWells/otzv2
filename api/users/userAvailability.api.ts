/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface UserProps {
  firstName: string
}

export const userAvailabilityApi = createApi({
  reducerPath: 'userAvailabilityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/users/user-availability`
  }),
  endpoints: (builder) => ({
    getAllUserAvailabilities: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addUserAvailability: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),

    getUserAvailability: builder.query({
      query: (id) => `detail/${id}`
    }),
    updateUserAvailability: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteUserAvailability: builder.mutation({
      query (id) {
        return {
          url: `delete${id}`,
          method: 'DELETE'
        }
      }
    })
  })
})

export const { useGetAllUserAvailabilitiesQuery, useAddUserAvailabilityMutation, useGetUserAvailabilityQuery } = userAvailabilityApi
