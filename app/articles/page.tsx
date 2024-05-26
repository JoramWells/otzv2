'use client'

import { useGetAllArticlesQuery } from '@/api/articles/articles.api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'

import 'react-quill/dist/quill.snow.css'
import { useGetAllChaptersQuery } from '@/api/articles/chapters.api'

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

const ArticlesPage = () => {
  const { data } = useGetAllArticlesQuery()
  const { data: chapterData } = useGetAllChaptersQuery()
  console.log(chapterData)

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
      <div className="flex flex-row flex-wrap w-full justify-start space-x-6 p-4">
        {data?.map((item: any) => (
          <div
            key={item.id}
            className="w-[300px] rounded-xl bg-white"
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
              src={`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${item.image}`}
              style={{
                width: '300px',
                height: '150px',
                objectFit: 'cover'
              }}
            />

            <div className="p-4">
              <p className="text-lg font-bold">{item.title}</p>

              <div
                dangerouslySetInnerHTML={{
                  __html: item.content?.substring(0, 130).concat('..')
                }}
              />
              <Badge className="shadow-none rounded-full bg-slate-200 text-slate-700 hover:bg-slate-200 ">
                {/* {item.} */}
                Prep
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArticlesPage
