import { Button } from '@/components/ui/button'
import CustomInput from '../forms/CustomInput'
import CustomSelect2 from '../forms/CustomSelect2'
import { useCallback, useState } from 'react'
import { useGetAllNotificationCategoriesQuery } from '@/api/notifications/notificationCategory.api'

const NotifySubCategory = () => {
  const [notificationSubCategoryName, setNotificationSubCategoryName] = useState('')
  const [notificationCategoryID, setNotificationCategoryID] = useState('')
  const { data } = useGetAllNotificationCategoriesQuery()

  const categoryOptions = useCallback(() => {
    return data?.map((item: any) => ({
      id: item.id,
      label: item.notificationDescription
    }))
  }, [data])

  return (
    <div className="flex flex-row space-x-4 w-full">
      {/* <CustomTable columns={columns} data={data || []} isSearch={false} /> */}

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
        <CustomSelect2
          label="Select Category"
          placeholder="Category"
          data={categoryOptions()}
          value={notificationCategoryID}
          onChange={setNotificationCategoryID}
        />

        <Button variant={'ghost'} className="w-full font-bold bg-slate-100">
          Save
        </Button>
      </div>
    </div>
  )
}

export default NotifySubCategory
