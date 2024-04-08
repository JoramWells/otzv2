/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAddNotificationCategoryMutation, useDeleteNotificationCategoryMutation, useGetAllNotificationCategoriesQuery, useUpdateNotificationCategoryMutation } from '@/api/notifications/notificationCategory.api'
import CustomInput from '../forms/CustomInput'
import { Loader2, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import moment from 'moment'

export interface NotificationCategoryProps {
  id: string
  notificationDescription: string
  updatedAt: string
}

const NotifyCategory = () => {
  const [notificationDescription, setNotificationDescription] = useState('')
  const [notificationDescriptions, setNotificationDescriptions] = useState<string[]>([])

  const { data } = useGetAllNotificationCategoriesQuery()
  const [addNotificationCategory, { isLoading: isLoadingNotificationCategory }] =
    useAddNotificationCategoryMutation()

  const [updateNotificationCategory, { isLoading: isLoadingNotificationUpdateCategory }] = useUpdateNotificationCategoryMutation()
  const [deleteNotificationCategory] = useDeleteNotificationCategoryMutation()
  // const inputValues2 = {
  //   id: notificationDescriptionEdit.id,
  //   notificationDescription: notificationDescriptionEdit.notificationDescription
  // }
  const inputValues = {
    notificationDescription
  }

  useEffect(() => {
    if (data) {
      setNotificationDescriptions(
        data.map((item: any) => item.notificationDescription)
      )
    }
  }, [data])

  const handleEdit = async (index: number) => {
    await updateNotificationCategory({
      id: data[index].id,
      notificationDescription: notificationDescriptions[index]
    })
  }

  const handleInputChange = (index: number, value: string) => {
    const updatedDescriptions = [...notificationDescriptions]
    updatedDescriptions[index] = value
    setNotificationDescriptions(updatedDescriptions)
  }

  const handleInputBlur = async (index: number) => {
    if (data[index]) {
      const inputValue = notificationDescriptions[index]
      const originalValue = data[index].notificationDescription

      // Check if input value is not empty and has changed
      if (inputValue && inputValue !== originalValue) {
        await handleEdit(index)
      }
    }
  }
  return (
    <div className="flex flex-row space-x-4 w-full">
      <div className="w-1/2 border border-slate-100 rounded-lg">
        <div
        className='flex flex-row justify-between
        p-4 bg-slate-50 rounded-t-lg border-b border-slate-100
        '
        >
          <p
          className='font-semibold text-slate-500'
          >Notification Categories</p>
          {isLoadingNotificationUpdateCategory && (
            <Loader2 className="animate-spin" />
          )}
        </div>
        {data?.map((item: NotificationCategoryProps, index: number) => (
          <div
            key={item.id}
            className="border-b border-slate-100 p-4
          flex flex-row space-x-4 items-center
          "
          >
            <div className="w-full">
              <Input
                className="shadow-none "
                value={notificationDescriptions[index]}
                onChange={(e) => {
                  handleInputChange(index, e.target.value)
                }}
                onBlur={() => handleInputBlur(index)}
                disabled={isLoadingNotificationUpdateCategory}
              />

              <p className="font-semibold text-sm mt-1 text-slate-500 ml-2">
                {moment(item.updatedAt).format('ll')}{' '}
              </p>
            </div>
            <Trash2
              size={18}
              className="text-red-500"
              onClick={() => deleteNotificationCategory(item.id)}
            />
          </div>
        ))}
      </div>

      <div
        className="w-1/2 border border-slate-200 rounded-lg p-4
      flex-col space-y-4 flex h-[170px] items-center justify-center
      "
      >
        <CustomInput
          label="Notification Category"
          placeholder="Enter Category name"
          value={notificationDescription}
          onChange={setNotificationDescription}
        />
        <Button
          variant={'ghost'}
          className="w-full font-bold bg-slate-100"
          onClick={() => addNotificationCategory(inputValues)}
          disabled={isLoadingNotificationCategory}
        >
          {isLoadingNotificationCategory && (
            <Loader2 className="animate-spin mr-2" size={18} />
          )}
          Save Notification Category
        </Button>
      </div>
    </div>
  )
}

export default NotifyCategory
