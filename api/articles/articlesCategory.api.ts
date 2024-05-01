/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articlesCategoryApi = createApi({
  reducerPath: "articlesCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/appointment/articles-category",
  }),
  endpoints: (builder) => ({
    getAllArticlesCategory: builder.query<any, void>({
      query: () => "fetchAll",
    }),
    addArticlesCategory: builder.mutation({
      query: (newUser) => ({
        url: "add",
        method: "POST",
        body: newUser,
      }),
    }),
    getArticlesCategory: builder.query({
      query: (id) => `detail/${id}`,
    }),

    deleteArticlesCategory: builder.mutation({
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
  useGetAllArticlesCategoryQuery, useAddArticlesCategoryMutation,
  useGetArticlesCategoryQuery,
  useDeleteArticlesCategoryMutation
} = articlesCategoryApi