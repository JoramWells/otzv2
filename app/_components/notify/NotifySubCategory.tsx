/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from '@/components/ui/button'
import CustomInput from '../../../components/forms/CustomInput'
import { useCallback, useState } from 'react'
import { useGetAllNotificationCategoriesQuery } from '@/api/notifications/notificationCategory.api'
import { useAddNotificationSubCategoryMutation, useGetAllNotificationSubCategoriesQuery } from '@/api/notifications/notificationSubCategory.api'
import { Loader2, Trash2 } from 'lucide-react'
import moment from 'moment'
import CustomSelect from '../../../components/forms/CustomSelect'

export interface NotifySubCategoryProps {
  id: string
  notificationSubCategoryName: string
  updatedAt: string
  notificationCategory: {
    notificationDescription: string
  }
}

const NotifySubCategory = () => {
  const [notificationSubCategoryName, setNotificationSubCategoryName] = useState('')
  const [notificationCategoryID, setNotificationCategoryID] = useState('')

  const { data } = useGetAllNotificationSubCategoriesQuery()
  console.log(data, 'dr')

  const {
    data: notificationCategoryData,
    isLoading: isLoadingNotificationCategory
  } = useGetAllNotificationCategoriesQuery()

  const [addNotificationSubCategory] = useAddNotificationSubCategoryMutation()

  const categoryOptions = useCallback(() => {
    return notificationCategoryData?.map((item: any) => ({
      id: item.id,
      label: item?.notificationDescription
    }))
  }, [notificationCategoryData])

  const inputValues = {
    notificationCategoryID,
    notificationSubCategoryName
  }

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
        {data?.map((item: NotifySubCategoryProps, index: number) => (
          <div
            key={item.id}
            className="border-b border-slate-100 p-4
          flex flex-row space-x-4 items-center
          "
          >
            <div className="w-full">
              <div>{item.notificationSubCategoryName}</div>
              <p
              className='text-sm text-slate-500 font-semibold'
              >{item.notificationCategory?.notificationDescription}</p>

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
          label="Sub Category"
          onChange={setNotificationSubCategoryName}
          value={notificationSubCategoryName}
        />
        <CustomSelect
          label="Select Category"
          placeholder="Category"
          data={categoryOptions()}
          value={notificationCategoryID}
          onChange={setNotificationCategoryID}
        />

        <Button
          variant={'ghost'}
          className="w-full font-bold bg-slate-100"
          onClick={async () => await addNotificationSubCategory(inputValues)}
        >
          {isLoadingNotificationCategory && (
            <Loader2 className="animate-spin mr-2" size={18} />
          )}
          Save
        </Button>
      </div>
    </div>
  )
}

export default NotifySubCategory
