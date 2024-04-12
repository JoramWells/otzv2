import React, { useState } from 'react'
import Urine from './urine/Urine'
import Blood from './blood/Blood'
import Stool from './stool/Stool'
import { type PatientIDProps } from './constants/patient'
import CustomTab from '../tab/CustomTab'
import { Button } from '@/components/ui/button'

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

const LabTab = ({ patientID }: PatientIDProps) => {
  const [value, setValue] = useState<number>(1)
  return (
    <div className="w-full">
      {/*  */}
      <div
      className='flex space-x-4'
      >
        {['Tests', 'Requests', 'Results'].map((item, idx) => (
          <Button key={idx}
          className='shadow-none bg-slate-50 text-slate-500
          font-bold rounded-full border border-slate-200 hover:bg-slate-100
          '
          >{item}</Button>
        ))}
      </div>

      <p className="text-xl font-bold mb-4">Lab Tests</p>

     <CustomTab
     categoryList={categoryList}
     setValue={setValue}
     value={value}
     />

      {value === 1 && <Blood patientID={patientID} />}
      {value === 2 && <Stool />}
      {value === 6 && <Urine />}
    </div>
  )
}

export default LabTab
