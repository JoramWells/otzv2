/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useGetAllArticlesCategoryQuery } from '@/api/articles/articlesCategory.api'
import { useGetAllChaptersQuery } from '@/api/articles/chapters.api'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import { EyeIcon, Loader2, PlusCircle, Save, TrashIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { type FormEvent, useCallback, useMemo, useState, useEffect } from 'react'
// import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)

export interface CategoryInputProps {
  id?: string
  description: string
};

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

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/articles/articles/add`

export interface ArticleProps {
  articleCategoryID: string
  file: File | undefined
  content: string
}

const ArticlesPage = () => {
  const ReactQuill = useMemo(() => dynamic(async () => await import('react-quill'), { ssr: false }), [])

  const { data, isLoading: isLoadingData } = useGetAllArticlesCategoryQuery()

  //

  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [categoryData, setCategoryData] = useState<CategoryInputProps[]>([])
  const [articleCategoryID, setArticleCategoryID] = useState('')
  const [chapterID, setChapterID] = useState('')
  const [file, setFile] = useState<File | undefined>()
  const [isLoadingArticleSave, setIsLoadingArticleSave] = useState<boolean>(false)

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
    await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    setIsLoadingArticleSave(false)
  }
  useEffect(() => {
    if (data) {
      setCategoryData(data)
    }
  }, [data])

  const { data: chapterData } = useGetAllChaptersQuery()

  const chapterOptions = useCallback(() => {
    const tempData = chapterData?.filter((item: any) => item.ArticleCategory?.id === articleCategoryID)
    return tempData?.map((item: any) => ({
      id: item.id, label: item.description
    }))
  }, [chapterData, articleCategoryID])

  const categoryOptions = useCallback(() => {
    return categoryData.map((item: any) => ({
      id: item.id,
      label: item.description
    }))
  }, [categoryData])

  const book = useCallback(() => {
    console.log(categoryData)
    const tempData = categoryData?.filter((item) => item.id === articleCategoryID)
    return tempData?.map(item => ({
      id: item.id,
      label: item.description
    })) || []
  }, [articleCategoryID, categoryData])()

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="w-full flex justify-between mt-2 p-2 bg-white">
        <p
          className="font-bold text-slate-700
        items-center
        "
        >
          Articles Category
        </p>
        <Button className="bg-teal-600 font-bold shadow-none hover:bg-teal-700">
          <PlusCircle className="mr-2" size={18} />
          <Link href={'/articles/add-article-category'}>
            Add Articles Category
          </Link>
        </Button>
      </div>

      <div className="p-4 flex flex-row space-x-4 items-start w-full">
        {/* <EditorContent editor={editor} /> */}

        <div
          className="w-1/2 rounded-lg bg-white
      p-4 flex flex-col space-y-4 sticky top-30"
        >
          <p className="font-bold text-xl text-slate-700">New Article</p>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <CustomInput
              label="Article title"
              value={title}
              onChange={setTitle}
              placeholder="Enter title"
            />

            <CustomSelect
              label="Select Category"
              value={articleCategoryID}
              onChange={setArticleCategoryID}
              data={categoryOptions()}
            />

            <CustomSelect
              label="Select Chapter"
              value={chapterID}
              onChange={setChapterID}
              data={chapterOptions()}
            />
            <div className="h-[250px] ">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                className="rounded-xl h-[200px] "
              />
            </div>

            <Input
              className=""
              type="file"
              name="file"
              // value={file}
              onChange={(e) => {
                setFile(e.target.files?.[0])
              }}
            />

            {/*  */}
            <Button
              className="shadow-none bg-teal-600 hover:bg-teal-700"
              type="submit"
              // onClick={() => addArticles({formData, file})}
              disabled={isLoadingArticleSave}
            >
              {isLoadingArticleSave && (
                <Loader2 className="mr-2 animate-spin" size={18} />
              )}
              SAVE
            </Button>
          </form>
        </div>

        {/*  */}

        <div className="w-1/2 border rounded-lg relative ">
          <div className="absolute top-2 right-2">
            <div className="flex space-x-2 ">
              <Button
                size={'sm'}
                // className='bg-transparent'
              >
                <Save size={15} />
              </Button>

              <Button
                size={'sm'}
                // className='bg-transparent'
              >
                <TrashIcon size={15} />
              </Button>
            </div>
          </div>
          <div className="p-4 ">
            <h1 className="font-bold">{title} </h1>
          </div>
          {file && (
            <Image
              // w={0}
              alt="im"
              // placeholder="data:image/..."
              width={0}
              height={0}
              // quality={350}
              // fill={true}
              // objectFit="contain"
              // priority
              // layout="fill"
              src={window.URL.createObjectURL(file)}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover'
              }}
            />
          )}

          <div className="mt-2 p-4">
            <h3 className="font-bold mb-2">
              {chapterOptions() &&
                chapterOptions().length > 0 &&
                chapterOptions()[0]?.label}
            </h3>

            {/*  */}
            <div
              className="text-[14px] "
              dangerouslySetInnerHTML={{
                __html: content
              }}
            />

            {/*  */}
            <Badge className="rounded-full text-[12px] ">
              {book.length > 0 && book[0]?.label}
            </Badge>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArticlesPage
