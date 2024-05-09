/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useAddArticlesMutation } from '@/api/articles/articles.api'
import { useAddArticlesCategoryMutation, useGetAllArticlesCategoryQuery } from '@/api/articles/articlesCategory.api'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { type FormEvent, useCallback, useMemo, useState, type Dispatch, type SetStateAction, useEffect } from 'react'
// import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)

interface CategoryInputProps {
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
type FileType = File | null

type SetFileType = Dispatch<SetStateAction<FileType>>

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/articles/add`

const ArticlesPage = () => {
  const ReactQuill = useMemo(() => dynamic(async () => await import('react-quill'), { ssr: false }), [])

  const [addArticlesCategory, { isLoading }] = useAddArticlesCategoryMutation()
  const { data, isLoading: isLoadingData } = useGetAllArticlesCategoryQuery()

  //
  const [addArticles, { isLoading: isLoadingArticles }] = useAddArticlesMutation()

  const [value, setValue] = useState('')
  const [category, setCategory] = useState('')
  const [categoryData, setCategoryData] = useState<CategoryInputProps[]>([])
  const [articleCategoryID, setArticleCategoryID] = useState('')
  const [file, setFile] = useState<File | undefined>()

  const inputValues = {
    description: category
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('articleCategoryID', articleCategoryID)
    formData.append('description', value)
    if (file != null) {
      formData.append('file', file)
    }
    formData.append('file', '')

    // const formData = {
    //   articleCategoryID,
    //   content: value,
    //   image: file
    // }

    // Call the addArticles mutation with the form data and file
    // await addArticles({ formData, file })
    await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log(formData.get('file'), 'dtx')
  }
  useEffect(() => {
    if (data) {
      setCategoryData(data)
    }
  }, [data])

  const categoryOptions = useCallback(() => {
    return categoryData.map((item: any) => ({
      id: item.id,
      label: item.description
    }))
  }, [categoryData])

  const handleAddArticlesCategory = useCallback(async (input: CategoryInputProps) => {
    setCategoryData([...categoryData, input])
    await addArticlesCategory(input)
  }, [addArticlesCategory, categoryData])

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-4 flex flex-row space-x-4 items-start">
        {/* <EditorContent editor={editor} /> */}

        <div
          className="w-1/2 rounded-lg bg-white
      p-4 flex flex-col space-y-4 "
        >
          <p className="font-bold text-xl text-slate-700">New Article</p>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <CustomSelect
              label="Select Category"
              value={articleCategoryID}
              onChange={setArticleCategoryID}
              data={categoryOptions()}
            />
            <div className="h-[250px] ">
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
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
            >
              {isLoadingArticles && (
                <Loader2 className="mr-2 animate-spin" size={18} />
              )}
              SAVE
            </Button>
          </form>
        </div>

        {/*  */}
        <div className="p-4 w-1/2 flex flex-col space-y-4 bg-white rounded-lg">
          <p className="text-xl font-bold text-slate-700">New Category</p>

          <CustomInput
            value={category}
            onChange={setCategory}
            label="Enter Category Description"
          />
          <Button
            className="shadow-none bg-teal-600 hover:bg-teal-700"
            onClick={async () => { await handleAddArticlesCategory(inputValues) }}
          >
            {isLoading && <Loader2 className="mr-2 animate-spin" size={18} />}
            ADD
          </Button>
        </div>
      </div>
    </>
  )
}

export default ArticlesPage
