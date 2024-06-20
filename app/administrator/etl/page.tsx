/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import dynamic from 'next/dynamic'
import React, { type FormEvent, useEffect, useState } from 'react'
//
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

const ETL = () => {
  const [file, setFile] = useState<File | undefined>()
  const [progress, setProgress] = useState(0)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    if (file != null) {
      formData.append('file', file)
    }
    formData.append('file', '')
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/etl/upload/`,
        formData,
        {
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
        }
      )
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(progress)
  }, [progress])
  return (
    <div>
      <BreadcrumbComponent dataList={dataList} />
      <div className='flex justify-between w-full items-center bg-white p-2'>
        <p>Manage Data</p>
        <Button>
            Upload
        </Button>
      </div>

      <form action=""
      onSubmit={handleSubmit}
      >
        <Input
        // label=''
        type='file'
        onChange={e => { setFile(e.target.files?.[0]) }}
        />
        <Button
        type='submit'
        >
            Submit
        </Button>
      </form>
    </div>
  )
}

export default ETL
