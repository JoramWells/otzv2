/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface AppModulesProps {
  id?: string
  title: string
  description: string
  img: string
  link: string
  isActive?: boolean
}

export const appModulesApi = createApi({
  reducerPath: 'appModulesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/root/app-modules`
  }),
  endpoints: (builder) => ({
    getAllAppModules: builder.query<AppModulesProps[], void>({
      query: () => 'fetchAll'
    }),
    addAppModules: builder.mutation<string, AppModulesProps>({
      query: (newUser: AppModulesProps) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getAppModules: builder.query<AppModulesProps, string>({
      query: (id) => `detail/${id}`
    }),
    updateAppModules: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteAppModules: builder.mutation({
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
  useGetAllAppModulesQuery, useAddAppModulesMutation,
  useGetAppModulesQuery,
  useUpdateAppModulesMutation, useDeleteAppModulesMutation
} = appModulesApi
