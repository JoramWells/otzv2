/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type HospitalAttributes, type UserInterface } from 'otz-types'

export type ExtendedUserInterface = UserInterface & {
  Hospital: HospitalAttributes
}

export interface UserResponseInterface {
  data: ExtendedUserInterface[]
  page: number
  total: number
  pageSize: number
  searchQuery: string
}

export interface UserInputParams {
  page?: number
  pageSize?: number
  searchQuery?: string
  hospitalName?: string
}
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/users/users`
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserResponseInterface, UserInputParams>({
      query: (params) => {
        if (params) {
          const { page, pageSize, searchQuery, hospitalName } =
            params
          let queryString = ''
          queryString += `page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&searchQuery=${searchQuery}`
          queryString += `&hospitalName=${hospitalName}`
          return `/fetchAll/?${queryString}`
        }
        return 'fetchAll'
      }
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    login: builder.mutation({
      query: (email) => `login/${email}`
    }),
    getUser: builder.query<UserInterface | null, string>({
      query: (id) => `detail/${id}`
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteUser: builder.mutation({
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
  useGetAllUsersQuery, useAddUserMutation, useGetUserQuery, useLoginMutation,
  useUpdateUserMutation, useDeleteUserMutation
} = userApi
