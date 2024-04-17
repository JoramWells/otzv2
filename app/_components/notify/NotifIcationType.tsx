/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import CustomInput from '../forms/CustomInput'
import { useAddNotificationTypeMutation, useGetAllNotificationTypesQuery } from '@/api/notifications/notificationTypes.api'
import { Loader2 } from 'lucide-react'

// interface DataProps {
//   columns: string
//   data: string
// }

const NotificationType = () => {
  const [notificationTypeName, setNotificationTypeName] = useState('')

  const { data: notificationData } = useGetAllNotificationTypesQuery()

  console.log(notificationData)

  const [addNotificationType, { isLoading: isLoadingNotificationType }] =
    useAddNotificationTypeMutation()

  const inputValues = {
    notificationTypeName
  }

  return (
    <div className="flex flex-row space-x-4 w-full">
      {/* <CustomTable columns={columns} data={data || []} isSearch={false} /> */}

      <div
        className="w-1/2 border border-slate-200 rounded-lg p-4
      flex-col space-y-4 flex h-[170px] items-center justify-center
      "
      >
        {notificationTypeName}
        <CustomInput
          label="Enter Notification Type"
          onChange={setNotificationTypeName}
          value={notificationTypeName}
        />

        <Button
          variant={'ghost'}
          className="w-full font-bold bg-slate-100"
          onClick={() => addNotificationType(inputValues)}
          disabled={isLoadingNotificationType}
        >
          {isLoadingNotificationType && (
            <Loader2 className="animate-spin mr-2" size={18} />
          )}
          Save Notification Type
        </Button>
      </div>
    </div>
  )
}

export default NotificationType
