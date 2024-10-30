'use client'

import CustomTab from '@/components/tab/CustomTab'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
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
    label: 'Patients',
    link: '/'
  }
]

const data = [
  {
    id: 3,
    label: 'Disclosure Checklist',
    description:
      'This file assess whether the patient is ready for disclosure.',
    link: '/users/reports/triage'
  },
  {
    id: 1,
    label: 'Follow-Up Checklist',
    description:
      'This file asses that basic components of the patient have been completed',
    link: '/users/reports/triage'
  },
  {
    id: 4,
    label: 'Linelist',
    description: 'Contains a list of patients active on ARV',
    link: '/users/reports/triage'
  },
  {
    id: 2,
    label: 'MMAS',
    description:
      'Morinsky Scale ensures that a patients adherence is monitored',
    link: '/users/reports/mmas'
  },
  {
    id: 5,
    label: 'Triage',
    description: 'Contains basic tests performed on a patient during visits',
    link: '/users/reports/triage'
  }
]

const PatientReport = () => {
  const [tabValue, setTabValue] = useState('mmas')
  const router = useRouter()

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <CustomTab categoryList={data} setValue={setTabValue} value={tabValue} />

      <div className="p-2">
        <div className="grid grid-cols-4 gap-2">
          {data.map((item) => (
            <div
              onClick={() => {
                router.push(item.link)
              }}
              key={item.id}
              className="relative p-5 bg-white border border-gray-300 rounded-lg overflow-hidden
            hover: cursor-pointer
            "
            >
              {/* Red Triangle */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-t-slate-500 border-l-[50px] border-r-transparent"></div>

              {/* Card Content */}
              <div className="relative z-10 text-slate-800">
                <h2 className="font-semibold text-[16px] ">{item.label}</h2>
                <p className="mt-2 text-[12px] text-slate-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PatientReport
