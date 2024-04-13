/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import Urine from './urine/Urine'
import Blood from './blood/Blood'
import Stool from './stool/Stool'
import { type PatientIDProps } from './constants/patient'
import CustomTab from '../tab/CustomTab'
import { Button } from '@/components/ui/button'
import HIVMonitoring from './blood/panel/HIVMonitoring'
import { useDeleteInternalLabRequestMutation, useGetInternalLabRequestByIDQuery, useGetInternalLabRequestQuery } from '@/api/viraload/internalLabRequest.api'
import { CustomCollapseButton } from '../dashboard/CustomCollapseButton'
import { Trash2 } from 'lucide-react'
import { CaseManagerDialog } from '../patient/casemanager/CaseManagerDialog'
import CustomSelect from '../forms/CustomSelect'

const categoryList = [
  {
    id: 1,
    label: 'Blood'
  },
  {
    id: 2,
    label: 'Stool'
  },
  {
    id: 3,
    label: 'Sputum'
  },
  {
    id: 4,
    label: 'Histology'
  },
  {
    id: 5,
    label: 'High Vaginal Swab'
  },
  {
    id: 6,
    label: 'Urine'
  }
]

interface TabListProps {
  id: number
  label: string
}

const tabList = [
  {
    id: 1,
    label: 'Results'
  },
  {
    id: 2,
    label: 'Requests'
  }
]

const LabTab = ({ patientID }: PatientIDProps) => {
  const [value, setValue] = useState<number>(1)
  const { data } = useGetInternalLabRequestByIDQuery(patientID)
  const [deleteInternalLabRequest] = useDeleteInternalLabRequestMutation(patientID)
  console.log(data)
  return (
    <div className="w-full  flex-col space-y-4">
      {/*  */}
      <div className="w-3/4 justify-between flex">
        <p className="font-extrabold text-lg">Laboratory Section</p>
        <CaseManagerDialog label="Add Lab Request">
          <HIVMonitoring patientID={patientID} />
        </CaseManagerDialog>
      </div>

      {tabList.map((item: TabListProps) => (
        <Button
          key={item.id}
          className={`shadow-none bg-slate-50 text-slate-500
          font-bold hover:bg-slate-100
          ${item.id === value && 'text-teal-600'}
          `}
          // size={'sm'}
          onClick={() => {
            setValue(item.id)
          }}
        >
          {item.label}
        </Button>
      ))}
      <div className="flex space-x-4 flex-row border w-[270px] p-1 rounded-lg items-center">
        <CustomSelect placeholder="All Reqs." />
        <CustomSelect placeholder="Specimen Type" />
      </div>

      {value === 1 && (
        <div className="flex flex-col space-y-4">
          {data?.map((item: any) => (
            <div key={item.id} className=" w-3/4 ">
              <CustomCollapseButton label={item.testName}>
                <div
                  className="flex flex-row justify-between items-center
                pt-2 pb-2
                "
                >
                  <p className="text-slate-500">Specimen Type:</p>
                  <p className="text-slate-500">{item.specimenType}</p>
                </div>

                <div className="flex justify-between">
                  <p>Reason:</p>
                  <p className="text-slate-500">{item.reason}</p>
                </div>
                <div
                  className="flex w-full justify-end
                p-2
                "
                >
                  <Trash2
                    className="bg-slate-100 rounded-lg
                    hover:cursor-pointer p-1 h-8 w-8 text-slate-500
                    "
                    onClick={() => deleteInternalLabRequest(item.id)}
                  />
                </div>
              </CustomCollapseButton>
            </div>
          ))}
        </div>
      )}
      {value === 2 && <div>Requests</div>}
    </div>
  )
}

export default LabTab
