/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'

import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import React, { type FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'
import { useGetAppModulesQuery } from '@/api/appModules/appModules.api'

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Patients',
    link: '/'
  }
]

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/root/app-modules/edit`

const AddApp = ({ params }: { params: any }) => {
  const { appModuleID } = params

  const { data } = useGetAppModulesQuery(appModuleID as string)
  console.log(data, 'data')

  const [file, setFile] = useState<File | undefined>()
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (data != null) {
      setTitle(data.title)
      setLink(data.link)
      setDescription(data.description)
    }
  }, [data])

  //
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('title', title)
    formData.append('description', description)
    formData.append('link', link)
    if (file != null) {
      formData.append('file', file)
    }
    formData.forEach((value, key) => {
      console.log(key, value)
    })

    // setIsLoadingArticleSave(true)
    await axios.put(URL + '/' + appModuleID, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      transformRequest: [data => data]
    })
    // setIsLoadingArticleSave(false);
  }
  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2">
        <form
          className="w-1/2 p-4 bg-white rounded-lg flex flex-col space-y-4"
          onSubmit={(e) => void handleSubmit(e)}
        >
          <CustomInput label="Module Name"
          name="title"
          value={title}
          onChange={setTitle} />
          <CustomInput label="Link"
          value={link}
          name="link" onChange={setLink} />
          <Textarea
            placeholder="Enter Description"
            name="description"
            value={description}
            className="shadow-none"
            onChange={(e) => {
              setDescription(e.target.value)
            }}
          />

          {/* <CustomInput
        label='Description'
        type='textarea'
        /> */}

          <CustomInput
            label="Select image"
            type="file"
            name="file"
            onChange={setFile}
            // value={file}
          />
          <Button size={'sm'} type="submit">
            Save
          </Button>
        </form>
      </div>
    </>
  )
}

export default AddApp
