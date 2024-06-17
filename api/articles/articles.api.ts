/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type ArticleProps } from '@/app/articles/add-article/page'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/articles/articles`
  }),
  endpoints: (builder) => ({
    getAllArticles: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addArticles: builder.mutation({
      query: ({ file, body }: { file: File, body: ArticleProps }) => {
        const formData = new FormData()
        formData.append('articleCategoryID', body.articleCategoryID)
        formData.append('description', body.content)
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

    getAllArticleChaptersById: builder.query({
      query: (id) => `fetchAllArticleChaptersById/${id}`
    }),

    deleteArticles: builder.mutation({
      query (id) {
        return {
          url: `delete/${id}`,
          method: 'DELETE'
        }
      }
    }),
    updateArticles: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `edit/${id}`,
        method: 'PUT',
        body: patch
      })
    })
  })
})

export const {
  useGetAllArticlesQuery, useAddArticlesMutation, useGetAllArticleChaptersByIdQuery,
  useGetArticlesQuery, useUpdateArticlesMutation,
  useDeleteArticlesMutation
} = articlesApi
