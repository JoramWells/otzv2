'use client'

import { useGetArticlesQuery } from '@/api/articles/articles.api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'

const loaderProp = ({ src }: { src: string }) => {
  return src
}

const Page = ({ params }: { params: any }) => {
  const { articleID } = params
  const { data: articleData } = useGetArticlesQuery(articleID)
  console.log(articleData, 'lop')
  return (
    <div
    className='flex justify-between items-center'
    >
      <div
        //   key={item.id}
        className="rounded-xl bg-white relative w-1/2"
        //   onClick={() => {
        //     router.push(`/articles/article-detail/${item.id}`);
        //   }}
      >
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
          // layout='fill'
          className="rounded-t-lg"
          src={`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${articleData?.image}`}
          style={{
            width: '300px',
            height: '150px',
            objectFit: 'cover'
          }}
          loader={loaderProp}
        />

        <div className="p-2">
          <p className="text-lg font-bold">{articleData?.title}</p>

          <div
            className="text-[14px] "
            dangerouslySetInnerHTML={{ __html: articleData?.content }}
          />
          <Badge className="shadow-none rounded-full bg-slate-200 text-slate-700 hover:bg-slate-200 ">
            {/* {item.} */}#
          </Badge>
        </div>
        <Button
          className="bg-slate-200 text-slate-500 hover:bg-slate-100 shadow-none
                absolute top-2 right-2
                "
          size={'sm'}
          //   onClick={async () => await deleteArticles(item.id)}
          //   disabled={isLoading}
        >
          <TrashIcon size={18} />
        </Button>
      </div>
    </div>
  )
}

export default Page
