/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useAddArticlesMutation } from '@/api/articles/articles.api'
import { useAddArticlesCategoryMutation, useGetAllArticlesCategoryQuery } from '@/api/articles/articlesCategory.api'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { type FormEvent, useCallback, useMemo, useState, type Dispatch, type SetStateAction } from 'react'
// import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

type FileType = File | null

type SetFileType = Dispatch<SetStateAction<FileType>>

const ArticlesPage = () => {
  const ReactQuill = useMemo(() => dynamic(async () => await import('react-quill'), { ssr: false }), [])

  const [addArticlesCategory, { isLoading }] = useAddArticlesCategoryMutation()
  const { data, isLoading: isLoadingData } = useGetAllArticlesCategoryQuery()

  //
  const [addArticles, { isLoading: isLoadingArticles }] = useAddArticlesMutation()
  const categoryOptions = useCallback(() => {
    return data?.map((item: any) => ({
      id: item.id, label: item.description
    }))
  }, [data])

  const [value, setValue] = useState('')
  const [category, setCategory] = useState('')
  const [articleCategoryID, setArticleCategoryID] = useState('')
  const [file, setFile] = useState<File>()

  const inputValues = {
    description: category
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = {
      articleCategoryID,
      content: value
    }

    // Call the addArticles mutation with the form data and file
    await addArticles({ formData, file })
  }

  // const formData = {
  //   articleCategoryID,
  //   description:value,
  //   file
  // };

  return (
    <div className="mt-12 p-4 flex flex-col space-y-4">
      {/* <EditorContent editor={editor} /> */}
      <div className="p-4 w-1/2 border flex flex-col space-y-4">
        <p className="text-xl font-bold text-slate-700">New Category</p>

        <CustomInput
          value={category}
          onChange={setCategory}
          label="Enter Category Description"
        />
        <Button
          className="shadow-none bg-teal-600 hover:bg-teal-700"
          onClick={async () => await addArticlesCategory(inputValues)}
        >
          {isLoading && <Loader2 className="mr-2 animate-spin" size={18} />}
          ADD
        </Button>
      </div>
      <div
        className="w-1/2 border border-slate-200 rounded-lg
      p-4 flex flex-col space-y-4 "
      >
        <p className="font-bold text-xl text-slate-700">New Article</p>

        <form className='flex flex-col space-y-4'
        onSubmit={handleSubmit}
        >
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
            onChange={(e) => { setFile(e.target.files?.[0]) }}
          />

          {/*  */}
          <Button
            className="shadow-none bg-teal-600 hover:bg-teal-700"
            // onClick={() => addArticles({formData, file})}
          >
            {isLoadingArticles && (
              <Loader2 className="mr-2 animate-spin" size={18} />
            )}
            SAVE
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ArticlesPage
