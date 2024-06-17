/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useDeleteArticlesCategoryMutation, useGetAllArticlesCategoryQuery } from '@/api/articles/articlesCategory.api'
import { Button } from '@/components/ui/button'
// import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2, PlusCircle, TrashIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
// import { useState } from 'react'
//
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
  }
)

interface ArticleCategoryProps {
  id: string
  description: string
  bookID: string
  thumbnail: string
  ArticleCategory: {
    id: string
  }
  Chapters:string[]
}

const dataList = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Dashboard',
    link: '/administrator/dashboard'
  }
]

const BookPage = () => {
//   const [value, setValue] = useState('')

  const { data: articleCategoryData, isLoading } = useGetAllArticlesCategoryQuery()
  const [deleteArticlesCategory, { isLoading: isLoadingDelete }] = useDeleteArticlesCategoryMutation()

  console.log(articleCategoryData, 'rty')

  return (
    <div>
      <BreadcrumbComponent dataList={dataList} />

      <div className="w-full flex justify-between mt-2 pl-4 p-2 bg-white items-center">
        <h2
          className="font-bold text-slate-700
        items-center
        "
        >
          All Books{' '}
          <span
          className='text-[14px] '
          >({articleCategoryData ? articleCategoryData.length : 0})</span>
        </h2>
        <Button className="bg-teal-600 font-bold shadow-none hover:bg-teal-700">
          <PlusCircle className="mr-2" size={18} />
          <Link href={'/articles/add-article-category'}
          className='underline'
          >New Book</Link>
        </Button>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-5 p-4 md:grid-cols-2">
        {isLoading
          ? [1, 2, 3, 4, 5].map((idx) => (
              <Skeleton key={idx} className="flex-1 h-[250px] " />
            ))
          : articleCategoryData?.map((item: ArticleCategoryProps) => (
              <div key={item.id} className="rounded-lg relative bg-white">
                <Image
                  // w={0}
                  alt="im"
                  // placeholder="data:image/..."
                  width={300}
                  height={150}
                  // quality={150}
                  // fill
                  // objectFit='contain'
                  // priority
                  className="rounded-t-lg"
                  src={`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${item.thumbnail}`}
                  style={{
                    width: '300px',
                    height: '150px',
                    objectFit: 'cover'
                  }}
                />
                <div className="p-2 flex flex-col space-y-2">
                  <Link className="font-bold" href={`/articles/${item.id}`}>
                    {item.description}
                  </Link>
                  <p className="text-slate-500 text-[12px] "> Chapters {item?.Chapters.length}</p>
                  <hr />
                  <div className="flex justify-end">
                    <Button
                      className="bg-white/[.2] text-slate-500 hover:bg-white/[.1] shadow-none  "
                      size={'sm'}
                      onClick={async () =>
                        await deleteArticlesCategory(item.id)
                      }
                      disabled={isLoadingDelete}
                    >
                      {isLoadingDelete
                        ? (
                        <Loader2 className="animate-spin" size={15} />
                          )
                        : (
                        <TrashIcon size={15} className="" />
                          )}
                    </Button>
                  </div>
                </div>
              </div>
          ))}
      </div>
    </div>
  )
}

export default BookPage
