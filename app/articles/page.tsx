'use client'

import { useGetAllArticlesQuery } from '@/api/articles/articles.api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import 'react-quill/dist/quill.snow.css'

const ArticlesPage = () => {
  const { data } = useGetAllArticlesQuery()

  return (
    <div className="p-4">
      {/* <EditorContent editor={editor} /> */}
      <div className="w-full flex justify-between mt-4 mb-4">
        <p
          className="text-2xl font-bold text-slate-700
        items-center
        "
        >
          Manage Articles
        </p>
        <Button className="bg-teal-600 font-bold">
          <PlusCircle className="mr-2" size={18} />
          <Link href={'/articles/add-article'}>Add Articles</Link>
        </Button>
      </div>
      <div className="flex flex-row flex-wrap w-full justify-start space-x-2">
        {data?.map((item: any) => (
          <div
            key={item.id}
            className="w-[300px] border border-slate-200 rounded-xl"
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
              src={`${process.env.NEXT_PUBLIC_API_URL}/api/appointment/${item.image}`}
              style={{
                width: '300px',
                height: '150px',
                objectFit: 'cover'
              }}
            />

            <div
            className='p-4'
            >
              <p className="text-lg font-bold">Learn About Prep</p>

              <div
                dangerouslySetInnerHTML={{
                  __html: item.description?.substring(0, 350).concat('..')
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
