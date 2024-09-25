'use client'

import { useAddEventTypeMutation, useGetAllEventTypeQuery } from '@/api/appointment/events/eventType'
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
// import CustomDatePicker2 from '@/components/forms/CustomDatePicker2'
import CustomInput from '@/components/forms/CustomInput'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock2, Loader2, Trash2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { type EventTypeAttributes } from 'otz-types'
// import { Button } from '@/components/ui/button'
import React, { useMemo, useState } from 'react'
import 'react-quill/dist/quill.snow.css'

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'clean'
]

const Page = () => {
  const ReactQuill = useMemo(
    () => dynamic(async () => await import('react-quill'), { ssr: false }),
    []
  )

  // const modules = useMemo(
  //   () => ({
  //     toolbar: {
  //       container: [
  //         [{ header: [2, 3, 4, false] }],
  //         ['bold', 'italic', 'underline', 'blockquote'],
  //         [{ color: [] }],
  //         [
  //           { list: 'ordered' },
  //           { list: 'bullet' },
  //           { indent: '-1' },
  //           { indent: '+1' }
  //         ],
  //         ['link', 'image'],
  //         ['clean']
  //       ]
  //     },
  //     clipboard: {
  //       matchVisual: true
  //     }
  //   }),
  //   []
  // )

  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('')
  const [description, setDescription] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [startTime, setStartTime] = useState('')

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const [addEventType, { isLoading: isLoadingEventAdd }] = useAddEventTypeMutation()

  const inputValues = {
    title,
    duration,
    description,
    startTime,
    timeZone,
    eventDate
  }

  const { data } = useGetAllEventTypeQuery()
  console.log(data)

  return (
    <div className="p-2">
      <CaseManagerDialog label="New">
        <div className="flex space-y-4 flex-col p-4">
          <div>
            <h1>Create New Event Type</h1>
            <p>Create new booking for this event</p>
          </div>
          <CustomInput
            label="Title"
            placeholder="Enter title"
            value={title}
            onChange={setTitle}
          />

          <CustomInput
            label="Event Date"
            type="date"
            value={eventDate}
            onChange={setEventDate}
          />

          <CustomInput
            label="Start Time"
            type="time"
            value={startTime}
            onChange={setStartTime}
          />

          <CustomInput
            label="Duration"
            type="number"
            value={duration}
            onChange={setDuration}
          />

          <div className="h-[150px] mb-8 ">
            <p className="text-slate-700 font-semibold mb-2">Description</p>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              formats={formats}
              // modules={modules}
              className="rounded-xl h-[100px] "
            />
          </div>
        </div>

        <div className="mt-4">
          <hr />
          <div className="flex justify-end space-x-4 p-4">
            <Button>Cancel</Button>
            <Button
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => await addEventType(inputValues)}
              disabled={isLoadingEventAdd}
            >
              {isLoadingEventAdd && (
                <Loader2 className="mr-2 animate-spin" size={18} />
              )}
              Continue
            </Button>
          </div>
        </div>
      </CaseManagerDialog>
      <h1>Events</h1>

      {/*  */}
      <h2>Most Popular</h2>
      {data?.map((item: EventTypeAttributes) => (
        <div key={item.id} className="border border-slate-200 rounded-lg p-4 flex justify-between items-center">
          <div
          className='flex flex-col space-y-2 items-start'
          >
            {item.title}
            <Badge
            className='p-1 bg-slate-200 shadow-none text-slate-700 hover:bg-slate-200 flex items-center '
            >
              <Clock2 size={15} className='mr-2' />
              {item.duration}m
            </Badge>
          </div>
          <Trash2/>
        </div>
      ))}
    </div>
  )
}

export default Page
