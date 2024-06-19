/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useGetAllArticleChaptersByIdQuery } from '@/api/articles/articles.api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { calculateReadingTime } from '@/utils/calculateReadTime'
import { calculateTimeDuration } from '@/utils/calculateTimeDuration'
import { TrashIcon } from 'lucide-react'
import moment, { type MomentInput } from 'moment'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
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
    id: '2',
    label: 'Dashboard',
    link: '/administrator/dashboard'
  }
]

const Page = ({ params }: { params: any }) => {
  const { chapterID } = params
  const { data, isLoading } = useGetAllArticleChaptersByIdQuery(chapterID)
  console.log(data, 'dr')

  const videoData: VideoProps[] = useCallback(() => {
    return data?.filter((item: any) => item.video?.length > 0)
  }, [data])()

  const imageData = useCallback(() => {
    return data?.filter((item: any) => item.image?.length > 0) || []
  }, [data])()

  const loaderProp = ({ src }: { src: string }) => {
    return src
  }

  type ControlsProps = Record<string, boolean>

  const [videos, setVideos] = useState<VideoProps[]>(videoData)
  const [showControls, setShowControls] = useState<ControlsProps>({
    id: false
  })

  function handleMouseEnter (id: string) {
    setShowControls(prev => ({ ...prev, [id]: true }))
  }

  function handleMouseLeave (id: string) {
    setShowControls(prev => ({ ...prev, [id]: false }))
  }

  function handlePlay (id: string) {
    setVideos(prev => prev?.map((video: VideoProps) => video.id === id ? { ...video, viewers: video.viewers + 1 } : video))
  }

  const router = useRouter()

  useEffect(() => {
    if (data) {
      const tempData: VideoProps[] = data?.filter((item: VideoProps) => item.video?.length > 0)
      setVideos(tempData)
    }
  }, [data])

  const [tab, setTab] = useState(1)

  interface VideoProps {
    id: string
    video: string
    updatedAt: MomentInput
    viewers: number
    Chapter: {
      description: string
    }
  }

  return (
    <>
      <BreadcrumbComponent dataList={dataList} />

      <div className="p-2 bg-white w-full mt-2">
        <h2 className="font-bold">Chapters</h2>
      </div>

      <div className="p-4 bg-white">
        <div className="flex border border-slate-200 w-1/4">
          {[
            { id: 1, label: 'Article' },
            { id: 2, label: 'Video' }
          ].map((item) => (
            <Button
              key={item.id}
              className="flex-1 bg-slate-50 rounded-full"
              onClick={() => {
                setTab(item.id)
              }}
              variant={'outline'}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
      {tab === 1 && (
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-5 p-4 md:grid-cols-2">
          {isLoading
            ? [1, 2, 3, 4, 5].map((idx) => (
                <Skeleton key={idx} className="flex-1 h-[250px] " />
              ))
            : imageData?.map((item: any) => (
                <div
                  key={item.id}
                  className="rounded-xl bg-white relative"
                  onClick={() => {
                    router.push(`/articles/article-detail/${item.id}`)
                  }}
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
                    src={`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${item.image}`}
                    style={{
                      width: '300px',
                      height: '150px',
                      objectFit: 'cover'
                    }}
                    loader={loaderProp}
                  />

                  <div className="p-2">
                    <p className="text-lg font-bold">
                      {item.title?.substring(0, 20).concat('...')}
                    </p>
                    <div
                      className="text-[14px] "
                      dangerouslySetInnerHTML={{
                        __html: item.content?.substring(0, 50).concat('..')
                      }}
                    />
                    {calculateReadingTime(item.content as string)} mins
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
            ))}
        </div>
      )}

      {/*  */}
      {tab === 2 && (
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-5 p-4 md:grid-cols-2">
          {videos?.map((item: VideoProps) => (
            <div key={item.id} className="300px 150px bg-white rounded-lg "
            onMouseEnter={() => { handleMouseEnter(item.id) }}
            onMouseLeave={() => { handleMouseLeave(item.id) }}
            >
              <video
                height={'50px'}
                width={'300px'}
                className="max-h-[150px] rounded-lg "
                controls={showControls[item.id] || false}
                onPlay={() => { handlePlay(item.id) }}
              >
                <source
                  src={`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${item.video}`}
                  type="video/mp4"
                />
              </video>
              <div className="p-4 mt-2">
                <h3
                className='text-[14px] font-bold '
                >{item.Chapter?.description}</h3>
                <p
                className='text-[12px] text-slate-500 '
                >
                  {calculateTimeDuration(moment(item.updatedAt, 'YYYY-MM-DD'))} {' '} Views: {item.viewers}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Page
