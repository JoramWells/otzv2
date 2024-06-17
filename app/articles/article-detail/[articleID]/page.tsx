/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useGetArticlesQuery } from '@/api/articles/articles.api'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { type FormEvent, useEffect, useMemo, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { type CategoryInputProps } from '../../add-article/page'
import CustomInput from '@/components/forms/CustomInput'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'
import axios from 'axios'

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

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/articles/articles/edit/`

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
  const [isLoadingArticleSave, setIsLoadingArticleSave] =
    useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('chapterID', chapterID)
    formData.append('title', title)
    formData.append('content', content)
    if (file != null) {
      formData.append('file', file)
    }
    formData.append('file', '')

    setIsLoadingArticleSave(true)
    await axios.put(URL + articleID, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    setIsLoadingArticleSave(false)
  }

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
        <form
          //   key={item.id}
          className="rounded-xl bg-white relative w-1/2 flex flex-col space-y-2 P-4"
          //   onClick={() => {
          //     router.push(`/articles/article-detail/${item.id}`);
          //   }}
          onSubmit={handleSubmit}
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
              <Button
              type='submit'
              // onClick={async () => { await handleSubmit() }}
              >Save</Button>
            </div>
          </div>
        </form>
        <div>Settings</div>
      </div>
    </>
  )
}

export default Page
