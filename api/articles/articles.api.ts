/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/appointment/articles'
  }),
  endpoints: (builder) => ({
    getAllArticles: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addArticles: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getArticles: builder.query({
      query: (id) => `detail/${id}`
    }),

    deleteArticles: builder.mutation({
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
  useGetAllArticlesQuery, useAddArticlesMutation,
  useGetArticlesQuery,
  useDeleteArticlesMutation
} = articlesApi
