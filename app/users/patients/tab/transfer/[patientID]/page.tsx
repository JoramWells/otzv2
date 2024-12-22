'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowRight } from 'lucide-react'
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

const PageTransfer = ({ params }: any) => {
  const { patientID } = params
  const dataList2 = [
    {
      id: '1',
      label: 'home',
      link: '/'
    },
    {
      id: '2',
      label: 'Dashboard',
      link: '/users/patients/tab/dashboard'
    }
    // {
    //   id: "3",
    //   label: `${patientData?.firstName} ${patientData?.middleName}`,
    //   link: "",
    // },
  ]

  const router = useRouter()
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <div
      className='p-2'
      >
        <Button
        className='shadow-none'
        variant={'outline'}
        size={'sm'}
        onClick={() => router.push(`/users/patients/tab/transfer/out/${patientID}`)}
        >
          Transfer Out
          <ArrowRight className='ml-2' size={14} />
        </Button>
        No recent Transfers
      </div>
    </div>
  )
}

export default PageTransfer
