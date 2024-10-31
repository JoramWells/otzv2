/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type PostDisclosureAttributes } from 'otz-types'

export type PostDisclosureInputProps = PostDisclosureAttributes & {
  Patient: { firstName: string
    middleName: string
    avatar: string | null

  }
  createdAt: string
}

export const postDisclosureApi = createApi({
  reducerPath: 'postDisclosureApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/post-disclosure`
  }),
  endpoints: (builder) => ({
    getAllPostDisclosure: builder.query<PostDisclosureInputProps[], void>({
      query: () => 'fetchAll'
    }),
    addPostDisclosure: builder.mutation({
      query: (response) => ({
        url: 'add',
        method: 'POST',
        body: response
      })
    }),
    getPostDisclosure: builder.query<PostDisclosureAttributes, string>({
      query: (id) => `detail/${id}`
    }),
    getAllPostDisclosureByVisitId: builder.query({
      query: (id) => `details/${id}`
    }),
    updatePostDisclosure: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch
      })
    }),
    deletePostDisclosure: builder.mutation({
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
  useGetAllPostDisclosureQuery, useAddPostDisclosureMutation, useGetAllPostDisclosureByVisitIdQuery,
  useGetPostDisclosureQuery
} = postDisclosureApi
