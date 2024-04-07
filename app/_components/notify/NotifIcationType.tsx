import React, { useState } from 'react'
import { CustomTable } from '../table/CustomTable'
import { Button } from '@/components/ui/button'
import CustomInput from '../forms/CustomInput'

const NotificationType = ({ columns, data }) => {
  const [notificationTypeName, setNotificationTypeName] = useState('')
  return (
    <div className="flex flex-row space-x-4 w-full">
      <CustomTable columns={columns} data={data || []} isSearch={false} />

      <div
        className="w-1/2 border border-slate-200 rounded-lg p-4
      flex-col space-y-4 flex h-[170px] items-center justify-center
      "
      >
        <CustomInput
        label='Enter Notification Type'
        onChange={setNotificationTypeName}
        value={notificationTypeName}
        />

        <Button variant={'ghost'} className="w-full font-bold bg-slate-100">
          Save Notification Type
        </Button>
      </div>
    </div>
  )
}

export default NotificationType
