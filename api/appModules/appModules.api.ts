/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type AppModuleInterface } from 'otz-types'

export interface AppModuleInputParams {
  page: number
  pageSize: number
  searchQuery: string
}

export type AppModuleResponseInterface = {
  data: AppModuleInterface[]
} & AppModuleInputParams & {
  total: number
}

export const appModulesApi = createApi({
  reducerPath: 'appModulesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/root/app-modules`
  }),
  endpoints: (builder) => ({
    getAllAppModules: builder.query<AppModuleResponseInterface, AppModuleInputParams>({
      query: (params) => {
        if (params) {
          const { page, pageSize, searchQuery } = params
          let queryString = ''
          queryString += `page=${page}`
          queryString += `&pageSize=${pageSize}`
          queryString += `&searchQuery=${searchQuery}`
          return `/fetchAll?${queryString}`
        }
        return 'fetchAll'
      }
    }),
    addAppModules: builder.mutation<string, AppModuleInterface>({
      query: (newUser: AppModuleInterface) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getAppModules: builder.query<AppModuleInterface, string>({
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
