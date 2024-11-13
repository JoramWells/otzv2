/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type AppModuleInterface, type AppModuleSessionInterface } from 'otz-types'

export type ExtendedAppModuleSession = AppModuleSessionInterface & {
  appModule: AppModuleInterface
}

export const appModuleSessionApi = createApi({
  reducerPath: 'appModuleSessionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/root/app-module-session`
  }),
  endpoints: (builder) => ({
    getAllAppModuleSession: builder.query<ExtendedAppModuleSession[], void>({
      query: () => 'fetchAll'
    }),
    addAppModuleSession: builder.mutation<string, ExtendedAppModuleSession>({
      query: (newUser: ExtendedAppModuleSession) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getAppModuleSession: builder.query<ExtendedAppModuleSession, string>({
      query: (id) => `detail/${id}`
    }),
    updateAppModuleSession: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deleteAppModuleSession: builder.mutation({
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
  useGetAllAppModuleSessionQuery, useAddAppModuleSessionMutation,
  useGetAppModuleSessionQuery,
  useUpdateAppModuleSessionMutation, useDeleteAppModuleSessionMutation
} = appModuleSessionApi
