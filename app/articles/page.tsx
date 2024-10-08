/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable multiline-ternary */
'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'

import 'react-quill/dist/quill.snow.css'
import { useGetAllChaptersQuery } from '@/api/articles/chapters.api'
import { useGetAllArticlesCategoryQuery } from '@/api/articles/articlesCategory.api'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Patients',
    link: '/'
  }
]

interface ArticleCategoryProps {
  id: string
  description: string
  bookID: string
  thumbnail: string
  ArticleCategory: {
    id: string
  }
}

const ArticlesPage = () => {
  const router = useRouter()
  const { data: chapterData, isLoading: isLoadingChapter } = useGetAllChaptersQuery()
  const { data: articleCategoryData, isLoading: isLoadingBook } = useGetAllArticlesCategoryQuery()
  const [value, setValue] = useState('')

  const iterData = useCallback(() => {
    return chapterData?.filter((item: ArticleCategoryProps) => item.ArticleCategory?.id === value)
  }, [chapterData, value])

  useEffect(() => {
    if (articleCategoryData) {
      setValue(articleCategoryData[0]?.id)
    }
  }, [articleCategoryData])

  console.log(articleCategoryData)

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-6 p-4 md:grid-cols-2">
        {isLoadingBook ? [1, 2, 3, 4, 5, 6].map((idx) => (<Skeleton key={idx} className='w-[250px] h-10 ' />))

          : articleCategoryData?.map((item: ArticleCategoryProps) => (
          <Button
            key={item.id}
            className="shadow-none bg-slate-200 hover:bg-slate-100 text-black"
            onClick={() => {
              setValue(item.id)
            }}
          >
            <div>
              <p>{item.description !== null && item.description}</p>
            </div>
          </Button>
          ))}
      </div>

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-6 p-4 md:grid-cols-2">
        {isLoadingChapter ? [1, 2, 3, 4, 5, 6].map((idx) => (<Skeleton key={idx} className='w-[250px] h-[180px] ' />))

          : iterData()?.map((item: ArticleCategoryProps) => (
          <Suspense key={item.id}>
            <div
              onClick={() => {
                router.push(`/articles/${item?.bookID}`)
              }}
              className="border border-slate-200 rounded-lg"
            >
              <Image
                // w={0}
                alt="im"
                placeholder="data:image/..."
                width={250}
                height={100}
                // quality={100}
                // fill
                // objectFit='contain'
                priority
                className="rounded-t-lg"
                src={`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${item.thumbnail}`}
                style={{
                  width: '250px',
                  height: '100px',
                  objectFit: 'cover'
                }}
              />
              <div className="p-2">
                <h2 className="font-bold">{item.description}</h2>
                <p className="text-slate-500 text-[12px] "> Chapters (4)</p>
              </div>
            </div>
          </Suspense>
          ))}
      </div>
    </>
  )
}

export default ArticlesPage
