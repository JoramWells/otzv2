/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useAddPAMAEnrollmentMutation } from '@/api/enrollment/pamaEnrollment.api'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import CustomInput from '@/components/forms/CustomInput'
import {useState} from 'react'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'enrollments',
    link: 'enrollments'
  }
]

const EnrollPMTCT = ({ params }: any) => {
  const { patientID } = params
  const [kmhflCode, setKMHFLCode] = useState('')
  const [anc, setANC] = useState('')
  const [pncNo, setPNCNo] = useState('')

  //
  const [addOTZEnrollment, { isLoading }] = useAddPAMAEnrollmentMutation()

  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList2} />

      <div className="flex justify-center mt-2">
        <div className="bg-white p-4 flex flex-col space-y-4 w-1/2 rounded-lg">
          <p className="text-lg font-bold">Medical & Surgical History</p>
          <div className="flex flex-col space-y-4">
            <CustomInput label="KMHFL Code." 
            onChange={setKMHFLCode}
            value={kmhflCode}
            />
            <CustomInput label="ANC" 
            onChange={setANC}
            value={anc}
            />
            <CustomInput label="PNC No." 
            onChange={setPNCNo}
            value={pncNo}
            />

          </div>

          <Button
            onClick={async () => await addOTZEnrollment(inputValues)}
            className="bg-slate-200 hover:bg-slate-100 shadow-none text-black"
          >
            {isLoading && <Loader2 className="animate-spin mr-2" size={18} />}
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EnrollPMTCT
