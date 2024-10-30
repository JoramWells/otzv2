'use client'

import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React from 'react'

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

const DisclosureChecklist = () => {
  const router = useRouter()
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      <div
      className='p-4'
      >
        <div className="flex flex-row space-x-2">
          {['Partial', 'Full'].map((item) => (
            <div
              key={item}
              onClick={() => {
                router.push('/users/reports/disclosure-checklist/partial')
              }}
              className="border flex-1 p-4 rounded-lg bg-white border-slate-200"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DisclosureChecklist
