/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useDeleteTimeAndWorkMutation, useUpdateScheduleMutation } from '@/api/treatmentplan/timeAndWork.api'
import { useGetPillDailyUptakeQuery } from '@/api/treatmentplan/uptake.api'
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import CustomTimeInput2 from '@/components/forms/CustomTimeInput2'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'
import { Button } from '@/components/ui/button'
import { Loader2, Pencil, Trash2 } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'dashboard',
    link: '/dashboard'
  },
  {
    id: '3',
    label: 'prescription',
    link: '/prescription'
  }
]

const PillBoxPage = ({ params }: { params: any }) => {
  const { id } = params
  const [morningMedicineTime, setMorningTime] = useState<string | undefined>()
  const [eveningMedicineTime, setEveningTime] = useState<string | undefined>()
  const [timeAndWorkID, setTimeAndWorkID] = useState<string>()
  const [updateSchedule, { isLoading }] = useUpdateScheduleMutation()

  const { data } = useGetPillDailyUptakeQuery(id as string)
  useEffect(() => {
    if (data) {
      setTimeAndWorkID(data.TimeAndWork?.id)
      setEveningTime(data.TimeAndWork?.eveningMedicineTime)
      setMorningTime(data.TimeAndWork?.morningMedicineTime)
    }
  }, [data])
  console.log(data, 'datam')

  const inputValues = useMemo(
    () => [
      {
        id: timeAndWorkID,
        morningMedicineTime,
        eveningMedicineTime
      }
    ],
    [timeAndWorkID, morningMedicineTime, eveningMedicineTime]
  )[0]

  const [deleteTimeAndWork, { isLoading: isLoadingDelete }] = useDeleteTimeAndWorkMutation()

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2 rounded-lg">
        <div className="w-1/2 border border-slate-200 rounded-lg bg-white">
          <div className="flex flex-row justify-between p-1">
            <div>
              <h5>Time Configuration</h5>
            </div>
            <div className="flex space-x-2 items-center">
              <CaseManagerDialog label={<Pencil size={16} />}>
                <div className="p-4 flex flex-col space-y-2">
                  <CustomTimeInput2
                    label="Morning Time"
                    onChange={setMorningTime}
                    value={morningMedicineTime}
                  />
                  <CustomTimeInput2
                    label="Evening Time"
                    onChange={setEveningTime}
                    value={eveningMedicineTime}
                  />
                  <Button
                    size={'sm'}
                    onClick={async () => await updateSchedule(inputValues)}
                  >
                    {isLoading && (
                      <Loader2 className="animate-spin mr-2" size={16} />
                    )}
                    Save
                  </Button>
                </div>
              </CaseManagerDialog>
              <Button
              size={'sm'}
              variant={'ghost'}
                onClick={async () => await deleteTimeAndWork(timeAndWorkID)}
              >
                {isLoadingDelete
                  ? (
                  <Loader2 className="animate-spin" size={16} />
                    )
                  : (
                  <Trash2 size={16} className="text-red-500" />
                    )}
              </Button>
            </div>
          </div>
          <div className="p-2">
            <div className="flex justify-between text-[14px]">
              <p>Morning Medicine Time</p>
              <p>{data?.TimeAndWork?.morningMedicineTime}</p>
            </div>

            {/*  */}
            <div className="flex justify-between text-[14px]">
              <p>Evening Medicine Time</p>
              <p>{data?.TimeAndWork?.eveningMedicineTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PillBoxPage
