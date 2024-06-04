/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useDeleteArticlesCategoryMutation, useGetAllArticlesCategoryQuery } from '@/api/articles/articlesCategory.api'
import { Button } from '@/components/ui/button'
// import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TrashIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
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
}

const dataList = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '1',
    label: 'Dashboard',
    link: '/administrator/dashboard'
  }
]

const BookPage = () => {
//   const [value, setValue] = useState('')

  const router = useRouter()

  const { data: articleCategoryData, isLoading } = useGetAllArticlesCategoryQuery()
  const [deleteArticlesCategory, { isLoading: isLoadingDelete }] = useDeleteArticlesCategoryMutation()

  return (
    <div>
      <BreadcrumbComponent dataList={dataList} />

         <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-6 p-4 md:grid-cols-2">
        {isLoading
          ? [1, 2, 3, 4, 5, 6].map((idx) => (<Skeleton key={idx} className='w-[250px] h-[150px] ' />))
          : articleCategoryData?.map((item: ArticleCategoryProps) => (
          <div
            key={item.id}
            onClick={() => {
              router.push(`/articles/${item.id}`)
            }}
            className="border border-slate-200 rounded-lg relative"
          >
            <Image
              // w={0}
              alt="im"
              // placeholder="data:image/..."
              width={250}
              height={100}
              // quality={100}
              // fill
              // objectFit='contain'
              // priority
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
              <Button
                className="bg-white/[.2] text-slate-500 hover:bg-white/[.1] shadow-none absolute top-2 right-2"
                size={'sm'}
                onClick={async () => await deleteArticlesCategory(item.id)}
                disabled={isLoadingDelete}
              >
                <TrashIcon size={15} className='text-white' />
              </Button>
          </div>
          ))}
      </div>
    </div>
  )
}

export default BookPage
