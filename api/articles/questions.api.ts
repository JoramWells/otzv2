/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const questionsApi = createApi({
  reducerPath: 'questionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/articles/questions`
  }),
  endpoints: (builder) => ({
    getAllQuestions: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addQuestions: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser
      })
    }),
    getQuestions: builder.query({
      query: (id) => `detail/${id}`
    }),

    deleteQuestions: builder.mutation({
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
  useGetAllQuestionsQuery, useAddQuestionsMutation,
  useGetQuestionsQuery,
  useDeleteQuestionsMutation
} = questionsApi
