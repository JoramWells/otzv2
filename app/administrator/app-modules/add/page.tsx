/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'

import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import React, { type FormEvent, useState } from 'react'
import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/root/app-modules/add`

const AddApp = () => {
  const [file, setFile] = useState<File | undefined>()
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')

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
    formData.append('file', '')

    // setIsLoadingArticleSave(true)
    await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    // setIsLoadingArticleSave(false);
  }
  return (
    <div className="p-2">
      <form
        className="w-1/2 p-4 bg-white rounded-lg flex flex-col space-y-4"
        onSubmit={(e) => void handleSubmit(e)}
      >
        <CustomInput label="Module Name" name="name" onChange={setTitle} />
        <CustomInput label="Link" name="link" onChange={setLink} />
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
  )
}

export default AddApp
