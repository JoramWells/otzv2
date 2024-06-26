/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import { useCallback, useState, type FormEvent } from 'react'
import axios from 'axios'
import { Skeleton } from '@/components/ui/skeleton'
import CustomInput from '@/components/forms/CustomInput'
import { Input } from '@/components/ui/input'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import CustomSelect from '@/components/forms/CustomSelect'
import { useGetAllArticlesCategoryQuery } from '@/api/articles/articlesCategory.api'
import { Loader2 } from 'lucide-react'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)

const URL_CATEGORY = `${process.env.NEXT_PUBLIC_API_URL}/api/articles/articles-category/add`
const URL_SUB_CATEGORY = `${process.env.NEXT_PUBLIC_API_URL}/api/articles/chapters/add`

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

const ArticleCategory = () => {
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [categoryID, setCategoryID] = useState('')
  const [thumbnail, setThumbnail] = useState<File | undefined>()
  const [subThumbnail, setSubThumbnail] = useState<File | undefined>()
  const [progress, setProgress] = useState(0)
  const [isLoadingBookSave, setIsLoadingBookSave] = useState<boolean>(false)
  const [isLoadingChapterSave, setIsLoadingChapterSave] = useState<boolean>(false)

  const { data } = useGetAllArticlesCategoryQuery()

  const categoryOptions = useCallback(() => {
    return data?.map((item: any) => ({
      id: item.id,
      label: item.description
    }))
  }, [data])

  const handleCategorySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('description', category)
    if (thumbnail != null) {
      formData.append('thumbnail', thumbnail)
    }
    formData.append('thumbnail', '')
    setIsLoadingBookSave(true)
    await axios.post(URL_CATEGORY, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    setIsLoadingBookSave(false)
  }

  const handleSubCategorySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('description', subCategory)
    formData.append('bookID', categoryID)
    if (subThumbnail != null) {
      formData.append('thumbnail', subThumbnail)
    }
    formData.append('thumbnail', '')
    setIsLoadingChapterSave(true)
    await axios.post(URL_SUB_CATEGORY, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: e => {
        const { loaded, total } = e
        if (total) {
          const percentCompleted = Math.round((loaded * 100) / total)
          setProgress(percentCompleted)
        }
      }
    })
    setIsLoadingChapterSave(false)
  }

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="flex p-2 space-x-4">
        {/*  */}

        <form
          className="p-4 flex-1 flex flex-col space-y-4 bg-white rounded-lg"
          onSubmit={handleCategorySubmit}
        >
          <p className="font-bold text-slate-700">New Book</p>

          <CustomInput
            value={category}
            onChange={setCategory}
            label="Book Description"
            placeholder='Enter Book Description'
          />

          {/* Thumbnail Image */}
          <div className="w-full flex flex-col space-y-2 text-[14px] text-slate-700 ">
            <label htmlFor="" className="font-bold">
              Select Book Thumbnail (image)
            </label>
            <Input
              className="shadow-none"
              type="file"
              name="thumbnail"
              // value={file}
              onChange={(e) => {
                setThumbnail(e.target.files?.[0])
              }}
            />
          </div>

          {/* <CustomInput
            label="Thumbnail Image"
            value={thumbnail}
            type="file"
            onChange={setThumbnail}
          /> */}

          <Button
            className="shadow-none bg-slate-200 hover:bg-slate-100 text-black"
            // onClick={async () => {
            //   await handleAddArticlesCategory(inputValues)
            // }}
            type="submit"
            disabled={isLoadingBookSave}
          >
            {isLoadingBookSave && <Loader2 className="mr-2 animate-spin" size={18} />}
            ADD
          </Button>
        </form>

        {/*  */}
        <form
          onSubmit={handleSubCategorySubmit}
          action=""
          className="flex-1 bg-white rounded-lg p-4 flex flex-col space-y-4"
        >
          {progress > 0 &&
          <div>{progress}%</div>
          }
          <CustomSelect
            label="Book"
            data={categoryOptions()}
            value={categoryID}
            onChange={setCategoryID}
            placeholder='Select Book'
          />

          <CustomInput
            label="Chapter"
            value={subCategory}
            onChange={setSubCategory}
            placeholder='Enter Chapter description'
          />
          {/* Thumbnail Image */}
          <div className="w-full flex flex-col space-y-2 text-[14px] text-slate-700 ">
            <label htmlFor="" className="font-bold">
              Select Chapter Thumbnail
            </label>
            <Input
              className="shadow-none"
              type="file"
              name="thumbnail"
              // value={file}
              onChange={(e) => {
                setSubThumbnail(e.target.files?.[0])
              }}
            />
          </div>
          <Button className="w-full shadow-none bg-slate-200 hover:bg-slate-100 text-black"
          disabled={isLoadingChapterSave}
          >
            {isLoadingChapterSave && <Loader2 className="mr-2 animate-spin" size={18} />}

            ADD
          </Button>
        </form>
      </div>
    </>
  )
}

export default ArticleCategory
