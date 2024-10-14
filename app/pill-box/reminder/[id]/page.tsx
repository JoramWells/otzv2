/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useDeleteTimeAndWorkMutation, useUpdateScheduleMutation } from '@/api/treatmentplan/timeAndWork.api'
import { useGetPillDailyUptakeQuery } from '@/api/treatmentplan/uptake.api'
import Avatar from '@/components/Avatar'
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import CustomTimeInput2 from '@/components/forms/CustomTimeInput2'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'
import { Button } from '@/components/ui/button'
import { Delete, Loader2, Pencil, Trash2 } from 'lucide-react'
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
  const [morningMedicineTime, setMorningTime] = useState<string | undefined | null>()
  const [eveningMedicineTime, setEveningTime] = useState<string | undefined | null>()
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

      <div className="mt-2 bg-white p-2 flex space-x-2 items-center">
        <Avatar
          name={`${data?.TimeAndWork?.Patient.firstName} ${data?.TimeAndWork?.Patient.middleName}`}
        />
        <p className="font-semibold text-slate-700">
          {data?.TimeAndWork?.Patient.firstName}{' '}
          {data?.TimeAndWork?.Patient.middleName}
        </p>
      </div>

      <div className="p-2 rounded-lg">
        <div className="w-1/2 border border-slate-200 rounded-lg bg-white">
          <div className="flex flex-row justify-between items-center p-1 border-b rounded-t-lg">
            <div>
              <h5 className="text-[14px] ml-2 font-semibold text-slate-700">
                Time Configuration
              </h5>
            </div>
            <div className="flex space-x-2 items-center">
              <CaseManagerDialog label={<Pencil size={16} />}>
                <div className="p-4 flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <CustomTimeInput2
                      label="Morning Time"
                      onChange={setMorningTime}
                      value={morningMedicineTime!}
                    />

                    <Button
                    onClick={() => { setMorningTime(null) }}
                      size={'sm'}
                      variant={'ghost'}
                      className="mt-8 bg-slate-100 hover:bg-slate-200 "
                    >
                      <Delete size={18} />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <CustomTimeInput2
                      label="Evening Time"
                      onChange={setEveningTime}
                      value={eveningMedicineTime!}
                    />
                    <Button
                    onClick={() => { setEveningTime(null) }}
                      size={'sm'}
                      variant={'ghost'}
                      className="mt-8 bg-slate-100 hover:bg-slate-200 "
                    >
                      <Delete size={18} />
                    </Button>
                  </div>
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
          <div className="p-4 flex flex-col space-y-4">
            <div className="flex justify-between text-[12px]  ">
              <p className="text-slate-700">Morning</p>
              {morningMedicineTime
                ? (
                <p>{morningMedicineTime}</p>
                  )
                : (
                <p>Not available</p>
                  )}
            </div>

            {/*  */}
            <div className="flex justify-between text-[12px] ">
              <p className="text-slate-700">Evening</p>
              {eveningMedicineTime
                ? (
                <p>{eveningMedicineTime}</p>
                  )
                : (
                <p>Not available</p>
                  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PillBoxPage
