/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import Urine from './urine/Urine'
import Blood from './blood/Blood'
import Stool from './stool/Stool'
import { type PatientIDProps } from './constants/patient'
import CustomTab from '../tab/CustomTab'
import { Button } from '@/components/ui/button'
import HIVMonitoring from './blood/panel/HIVMonitoring'

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
  return (
    <div className="w-full  flex-col space-y-4">
      {/*  */}
      <div className="flex space-x-4">
        {tabList.map((item: TabListProps) => (
          <Button
            key={item.id}
            className="shadow-none bg-slate-50 text-slate-500
          font-bold rounded-full border border-slate-200 hover:bg-slate-100
          "
          onClick={() => { setValue(item.id) }}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {/* <CustomTab
        categoryList={categoryList}
        setValue={setValue}
        value={value}
      /> */}
<HIVMonitoring patientID={patientID} />
      {value === 1 && <div>Results</div>}
      {value === 2 && <div>Requests</div>}

    </div>
  )
}

export default LabTab
