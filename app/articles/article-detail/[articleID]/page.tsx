'use client'

import { useGetArticlesQuery } from '@/api/articles/articles.api'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
  }
)

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

const loaderProp = ({ src }: { src: string }) => {
  return src
}

const Page = ({ params }: { params: any }) => {
  const { articleID } = params
  const { data: articleData } = useGetArticlesQuery(articleID)
  return (
    <>
      <BreadcrumbComponent dataList={dataList} />

      <div className="flex justify-center items-center mt-2">
        <div
          //   key={item.id}
          className="rounded-xl bg-white relative"
          //   onClick={() => {
          //     router.push(`/articles/article-detail/${item.id}`);
          //   }}
        >
          <Image
            // w={0}
            alt="im"
            // placeholder="data:image/..."
            width={500}
            height={350}
            // quality={100}
            // fill
            // objectFit='contain'
            // priority
            // layout='fill'
            className="rounded-t-lg"
            src={`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${articleData?.image}`}
            style={{
              width: '500px',
              height: '350px',
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

        </div>
      </div>
    </>
  )
}

export default Page
