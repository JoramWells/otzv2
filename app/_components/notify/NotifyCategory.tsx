import React from 'react'
import { CustomTable } from '../table/CustomTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const NotifyCategory = ({ columns, data }) => {
  return (
    <div className="flex flex-row space-x-4 w-full">
      <CustomTable columns={columns} data={data || []} isSearch={false} />

      <div
        className="w-1/2 border border-slate-200 rounded-lg p-4
      flex-col space-y-4 flex h-[170px] items-center justify-center
      "
      >
        <div className="w-full flex flex-col space-y-2">
          <label className="font-bold">Notification Category</label>
          <Input placeholder="Enter Category name" />
        </div>
        <Button variant={"ghost"} className="w-full font-bold bg-slate-100">
          Save Notification Type
        </Button>
      </div>
    </div>
  );
}

export default NotifyCategory
