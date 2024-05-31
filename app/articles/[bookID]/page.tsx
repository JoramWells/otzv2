/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useDeleteArticlesMutation, useGetAllArticlesQuery } from '@/api/articles/articles.api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'

const loaderProp = ({ src }: { src: string }) => {
  return src
}

const ArticlePage = () => {
  const { data } = useGetAllArticlesQuery()

  const [deleteArticles, { isLoading }] = useDeleteArticlesMutation()
  console.log(data)

  return (
    <div className="flex flex-row flex-wrap w-full justify-center p-4 gap-4 ">
      {data?.map((item: any) => (
        <div key={item.id} className="w-[300px] rounded-xl bg-white relative">
          <Image
            // w={0}
            alt="im"
            // placeholder="data:image/..."
            width={300}
            height={150}
            // quality={100}
            // fill
            // objectFit='contain'
            // priority
            layout='fill'
            className="rounded-t-lg"
            src={`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${item.image}`}
            style={{
              width: '300px',
              height: '150px',
              objectFit: 'cover'
            }}
            loader={loaderProp}
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
          <div className='p-2 w-full absolute bottom-0 right-0'>
            <Button
              className="bg-slate-200 text-slate-500 hover:bg-slate-100 shadow-none"
              size={'sm'}
              onClick={async () => await deleteArticles(item.id)}
              disabled={isLoading}
            >
              <TrashIcon size={18} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArticlePage
