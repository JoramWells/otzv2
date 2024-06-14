/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useGetArticlesQuery } from '@/api/articles/articles.api'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { type CategoryInputProps } from '../../add-article/page'
import CustomInput from '@/components/forms/CustomInput'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'

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
  const ReactQuill = useMemo(
    () => dynamic(async () => await import('react-quill'), { ssr: false }),
    []
  )

  const { articleID } = params
  const { data: articleData } = useGetArticlesQuery(articleID)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [categoryData, setCategoryData] = useState<CategoryInputProps[]>([])
  const [articleCategoryID, setArticleCategoryID] = useState('')
  const [chapterID, setChapterID] = useState('')
  const [file, setFile] = useState<File | undefined>()

  useEffect(() => {
    if (articleData) {
      const { content, title, file } = articleData
      setContent(content)
      setTitle(title)
      setFile(file)
    }
  }, [articleData])

  return (
    <>
      <BreadcrumbComponent dataList={dataList} />

      <div className="flex p-4">
        <div
          //   key={item.id}
          className="rounded-xl bg-white relative w-1/2 flex flex-col space-y-2"
          //   onClick={() => {
          //     router.push(`/articles/article-detail/${item.id}`);
          //   }}
        >
          <CustomInput
            label="Article title"
            value={title}
            onChange={setTitle}
            placeholder="Enter title"
          />

          <div className="p-2">
            {/*  */}
            <div className="h-[250px] ">
              <label htmlFor="" className="font-bold">
                Description
              </label>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                className="rounded-xl h-[200px] "
              />
            </div>

            {/*  */}
            <div className="w-[200px] p-2 mt-6">
              <label htmlFor="" className="font-bold">
                Thumbnail
              </label>
              <div className="border border-dashed rounded-lg relative  w-full p-2">
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
                  className="rounded-lg"
                  src={`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${articleData?.image}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover'
                  }}
                  loader={loaderProp}
                />
                <XIcon
                className='absolute right-2 top-2'
                />
              </div>
            </div>

            <div>
              <label htmlFor=""
              className='text-slate-500 text-[12px]  '
              >Select Thumbnail Image</label>
              <Input
                // className="mt-6"
                type="file"
                name="file"
                // value={file}
                onChange={(e) => {
                  setFile(e.target.files?.[0])
                }}
              />
            </div>

            {/* <div
              className="text-[14px] "
              dangerouslySetInnerHTML={{ __html: articleData?.content }}
            /> */}
            <Badge className="shadow-none rounded-full bg-slate-200 text-slate-700 hover:bg-slate-200 ">
              {/* {item.} */}#
            </Badge>
            <div className="flex space-x-2 items-center justify-end p-2 ">
              <Button className="text-red-500  bg-white hover:bg-red-50">
                Delete
              </Button>
              <Button>Save</Button>
            </div>
          </div>
        </div>
        <div>Settins</div>
      </div>
    </>
  )
}

export default Page
