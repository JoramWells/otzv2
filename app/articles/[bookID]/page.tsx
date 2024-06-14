/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useDeleteArticlesMutation } from '@/api/articles/articles.api'
import { useGetAllChapterBooksQuery } from '@/api/articles/chapters.api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TrashIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
  }
)

const loaderProp = ({ src }: { src: string }) => {
  return src
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

const ArticlePage = ({ params }: { params: any }) => {
  const { bookID } = params
  const { data, isLoading: isLoadingChapter } = useGetAllChapterBooksQuery(bookID)

  const [deleteArticles, { isLoading }] = useDeleteArticlesMutation()

  const router = useRouter()

  return (
    <>
      <BreadcrumbComponent dataList={dataList} />

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-6 p-4 md:grid-cols-2">
        {isLoadingChapter ? [1, 2, 3, 4, 5, 6].map((idx) => (<Skeleton key={idx} className='flex-1 h-[150px] ' />))
          : data?.map((item: any) => (
          <div key={item.id} className="rounded-xl bg-white relative"
          onClick={() => { router.push(`/articles/articles/${item.id}`) }}
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
              src={`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${item.thumbnail}`}
              style={{
                width: '300px',
                height: '150px',
                objectFit: 'cover'
              }}
              loader={loaderProp}
            />

            <div className="p-2">
              <p className="font-bold">
                {item.description?.substring(0, 20).concat('...')}
              </p>

              <Badge className="shadow-none rounded-full bg-slate-200 text-slate-700 hover:bg-slate-200 ">
                {/* {item.} */}
                #tag
              </Badge>
            </div>
            <Button
              className="bg-white/[.2] text-white hover:bg-white/[.1] shadow-none absolute top-2 right-2"
              size={'sm'}
              onClick={async () => await deleteArticles(item.id)}
              disabled={isLoading}
            >
              <TrashIcon size={18} />
            </Button>
          </div>
          ))}
      </div>
    </>
  )
}

export default ArticlePage
