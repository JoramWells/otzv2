/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
import { useEffect, useState } from 'react'

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
    id: '2',
    label: 'Dashboard',
    link: '/administrator/dashboard'
  }
]

interface BookProps {
  description: string
  thumbnail: string
}

const ArticlePage = ({ params }: { params: any }) => {
  const { bookID } = params
  const { data, isLoading: isLoadingChapter } = useGetAllChapterBooksQuery(bookID)
  console.log(data, 'datam')

  const [book, setBook] = useState<BookProps>()
  useEffect(() => {
    if (data) {
      const aBook = data[0]
      setBook(aBook.Book)
      // setBook()
    }
  }, [data])

  console.log(book, 'buk')

  const [deleteArticles, { isLoading }] = useDeleteArticlesMutation()

  const router = useRouter()

  return (
    <>
      <BreadcrumbComponent dataList={dataList} />

      <div className="flex items-start justify-between space-x-4 p-4">
        <div className="w-1/2">
          {isLoadingChapter ? (
            <div>loadin...</div>
          ) : book ? (
            <div
            className='rounded-lg bg-white'
            >
              <Image
                // w={0}
                alt="im"
                // placeholder="data:image/..."
                width={0}
                height={0}
                // quality={100}
                // fill
                // objectFit='contain'
                // priority
                // layout='fill'
                className="rounded-t-lg"
                src={`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${book.thumbnail}`}
                style={{
                  width: '100%',
                  height: '350px',
                  objectFit: 'cover'
                }}
                loader={loaderProp}
              />
              <div
              className='p-4'
              >
                <h2>{book.description}</h2>
              </div>
            </div>
          ) : (
            'no book'
          )}
        </div>

        <div className="flex flex-col w-1/2 space-y-2 bg-white p-4 rounded-lg">
        <div>
          <h3>
            Chapters
          </h3>
        </div>
          {isLoadingChapter
            ? [1, 2, 3, 4, 5].map((idx) => (
                <Skeleton key={idx} className="flex-1 h-[250px] " />
              ))
            : data?.map((item: any) => (
                <div
                  key={item.id}
                  className="rounded-lg bg-white relative flex justify-between border border-slate-200"
                  onClick={() => {
                    router.push(`/articles/articles/${item.id}`)
                  }}
                >
                  <div className="flex space-x-4 items-center">
                    <Image
                      // w={0}
                      alt="im"
                      // placeholder="data:image/..."
                      width={100}
                      height={50}
                      // quality={100}
                      // fill
                      // objectFit='contain'
                      // priority
                      // layout='fill'
                      className="rounded-tl-lg rounded-bl-lg"
                      src={`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${item.thumbnail}`}
                      style={{
                        width: '100px',
                        height: '50px',
                        objectFit: 'cover'
                      }}
                      loader={loaderProp}
                    />
                    <div className="p-2">
                      <p className="font-bold">{item.description}</p>
                      <Badge className="shadow-none rounded-full">#tag</Badge>
                    </div>
                  </div>

                  <div className="p-2 flex space-x-4 items-center">
                    <div className="h-[30px] border-l border-slate-200" />

                    <div className="flex justify-end">
                      <Button
                        className="bg-white/[.2] text-slate-500 hover:bg-white/[.1] shadow-none"
                        size={'sm'}
                        onClick={async () => await deleteArticles(item.id)}
                        disabled={isLoading}
                      >
                        <TrashIcon size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default ArticlePage
