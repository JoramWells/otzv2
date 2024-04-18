/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import React, { useState } from 'react'
import { type PatientIDProps } from './constants/patient'
import { Button } from '@/components/ui/button'
import HIVMonitoring from './blood/panel/HIVMonitoring'
import { CaseManagerDialog } from '../patient/casemanager/CaseManagerDialog'
import CustomSelect from '../forms/CustomSelect'
import LabCollapseButton from './LabCollapseButton'
import { useGetInternalLabRequestByIDQuery } from '@/api/viraload/internalLabRequest.api'

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
  return (
    <div className="w-full flex  flex-col space-y-4 items-center justify-center">
      {/*  */}
      <div className="w-1/2 justify-between flex">
        <p className="font-extrabold text-lg">Laboratory Sections</p>
        <CaseManagerDialog label="Add Lab Request">
          <HIVMonitoring patientID={patientID} />
        </CaseManagerDialog>
      </div>

      <div
        className="flex flex-row space-x-2
      w-1/2
      "
      >
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
      </div>
      <div className="flex space-x-4 flex-row border w-1/2 p-1 rounded-sm items-center">
        <div className="flex space-x-2">
          <CustomSelect
            placeholder="All Reqs."
            data={[]}
            value=""
            onChange={() => {}}
          />
          <CustomSelect
            placeholder="Specimen Type"
            data={[]}
            value=""
            onChange={() => {}}
          />
        </div>
      </div>

      <div
      className='w-1/2'
      >
        {value === 1 && <LabCollapseButton data={data} patientID={patientID} />}
      </div>

      {value === 2 && <div>Requests</div>}
    </div>
  )
}

export default LabTab
