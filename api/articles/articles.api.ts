/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/articles`
  }),
  endpoints: (builder) => ({
    getAllArticles: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addArticles: builder.mutation({
      query: ({ file, body }) => {
        const formData = new FormData()
        formData.append('articleCategoryID', body.articleCategoryID)
        formData.append('description', body.description)
        formData.append('file', file)
        return {
          url: 'add',
          method: 'POST',
          body: formData
        }
      }
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
