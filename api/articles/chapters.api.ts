/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const chaptersApi = createApi({
  reducerPath: 'chaptersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/articles/chapters`
  }),
  endpoints: (builder) => ({
    getAllChapters: builder.query<any, void>({
      query: () => 'fetchAll'
    }),
    addChapters: builder.mutation({
      query: ({ file, body }: { file: File, body }) => {
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
    getChapters: builder.query({
      query: (id) => `detail/${id}`
    }),

    deleteChapters: builder.mutation({
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
  useGetAllChaptersQuery, useAddChaptersMutation,
  useGetChaptersQuery,
  useDeleteChaptersMutation
} = chaptersApi
