/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import { Button } from '@/components/ui/button'
import CustomInput from '../forms/CustomInput'
import { useCallback, useState } from 'react'
import { useGetAllNotificationSubCategoriesQuery } from '@/api/notifications/notificationSubCategory.api'
import { useAddNotificationMutation, useGetAllNotificationsQuery } from '@/api/notifications/notification.api'
import { Loader2, Trash2 } from 'lucide-react'
import moment, { type MomentInput } from 'moment'
import { type NotifySubCategoryProps } from './NotifySubCategory'
import CustomSelect from '../forms/CustomSelect'

export interface NotificationProps {
  id: string
  updatedAt: MomentInput
  notificationDescription: string
  notificationSubCategory: NotifySubCategoryProps
}

const NotificationComponent = () => {
  const [notificationDescription, setNotificationDescription] = useState('')
  const [notificationSubCategoryID, setNotificationSubCategoryID] = useState('')

  const { data: subCatData } = useGetAllNotificationSubCategoriesQuery()
  const { data } = useGetAllNotificationsQuery()
  const [addNotification, { isLoading: isNotificationLoading }] = useAddNotificationMutation()
  const subCatOptions = useCallback(() => {
    return subCatData?.map((item: any) => ({
      id: item.id,
      label: item.notificationSubCategoryName
    }))
  }, [subCatData])

  const inputValues = {
    notificationSubCategoryID,
    notificationDescription
  }

  console.log(data, 'dr')

  return (
    <div className="flex flex-row space-x-4 w-full">
      <div className="w-1/2 border border-slate-100 rounded-lg">
        <div
          className="flex flex-row justify-between
        p-4 bg-slate-50 rounded-t-lg border-b border-slate-100
        "
        >
          <p className="font-semibold text-slate-500">
            Notification Sub Categories
          </p>
          {/* {isLoadingNotificationUpdateCategory && (
            <Loader2 className="animate-spin" />
          )} */}
        </div>
        {data?.map((item: NotificationProps, index: number) => (
          <div
            key={item.id}
            className="border-b border-slate-100 p-4
          flex flex-row space-x-4 items-center
          "
          >
            <div className="w-full">
              <div>{item.notificationDescription}</div>
              <p className="text-sm text-slate-500 font-semibold">
                {item.notificationSubCategory.notificationSubCategoryName}
              </p>
              <p>
                {item.notificationSubCategory.notificationCategory.notificationDescription}
              </p>

              <p className="text-sm mt-1 text-slate-500">
                Updated: {moment(item.updatedAt).format('ll')}{' '}
              </p>
            </div>
            <Trash2
              size={18}
              className="text-red-500"
              // onClick={() => deleteNotificationCategory(item.id)}
            />
          </div>
        ))}
      </div>
      <div
        className="w-1/2 border border-slate-200 rounded-lg p-4
      flex-col space-y-4 flex h-[250px] items-center justify-center
      "
      >
        <CustomInput
          label="Notification Description"
          value={notificationDescription}
          onChange={setNotificationDescription}
        />
        <CustomSelect
          label="Select"
          placeholder="Sub Category"
          value={notificationSubCategoryID}
          onChange={setNotificationSubCategoryID}
          data={subCatOptions()}
        />

        <Button
          variant={'ghost'}
          className="w-full font-bold bg-slate-100"
          onClick={() => addNotification(inputValues)}
        >
          {isNotificationLoading && (
            <Loader2 className="animate-spin mr-2" size={18} />
          )}
          Save Notification Type
        </Button>
      </div>
    </div>
  )
}

export default NotificationComponent
