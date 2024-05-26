'use client'

import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'

import 'react-quill/dist/quill.snow.css'
import { useGetAllChaptersQuery } from '@/api/articles/chapters.api'
import { useGetAllArticlesCategoryQuery } from '@/api/articles/articlesCategory.api'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Patients',
    link: ''
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
  const { data: chapterData } = useGetAllChaptersQuery()
  const { data: articleCategoryData } = useGetAllArticlesCategoryQuery()
  const [value, setValue] = useState('')

  const iterData = useCallback(() => {
    return chapterData?.filter((item: ArticleCategoryProps) => item.ArticleCategory?.id === value)
  }, [chapterData, value])

  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList2} />

      <div className="w-full flex justify-between mt-2 mb-2 p-2 bg-white">
        <p
          className="text-2xl font-bold text-slate-700
        items-center
        "
        >
          Manage Articles
        </p>
        <Button className="bg-teal-600 font-bold shadow-none hover:bg-teal-700">
          <PlusCircle className="mr-2" size={18} />
          <Link href={'/articles/add-article'}>Add Articles</Link>
        </Button>
      </div>

      <div className="flex space-x-4 p-2 overflow-x-auto">
        {articleCategoryData?.map((item: ArticleCategoryProps) => (
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

      <div className="flex space-x-4 p-2">
        {iterData()?.map((item: ArticleCategoryProps) => (
          <div
            key={item.id}
            onClick={() => {
              router.push(`/articles/${item?.bookID}`)
            }}
          >
            <Image
              // w={0}
              alt="im"
              placeholder="data:image/..."
              width={300}
              height={150}
              // quality={100}
              // fill
              // objectFit='contain'
              priority
              className="rounded-t-lg"
              src={`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${item.thumbnail}`}
              style={{
                width: '300px',
                height: '150px',
                objectFit: 'cover'
              }}
            />
            {item.description}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArticlesPage
