/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useGetAllTransferInsByPatientIDQuery } from '@/api/users/transfer/transferIn.api'
import PageTableContainer from '@/app/_components/table/PageTableContainer'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import usePreprocessData from '@/hooks/usePreprocessData'
import { ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React from 'react'
import { transferInColumns } from '../columns'
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
  const { data: transferInData, isLoading } = useGetAllTransferInsByPatientIDQuery({
    patientID: patientID as string,
    page: 1,
    pageSize: 10,
    searchQuery: ''
  }, {
    skip: !patientID
  })
  const { data, total } = usePreprocessData(transferInData)
  console.log(data)
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="p-2">
        <Button
          className="shadow-none"
          variant={'outline'}
          size={'sm'}
          onClick={() =>
            router.push(`/users/patients/tab/transfer/out/${patientID}`)
          }
        >
          Transfer Out
          <ArrowRight className="ml-2" size={14} />
        </Button>
      </div>
      <PageTableContainer
        columns={transferInColumns}
        data={data}
        total={total as number}
        title="Transfer In"
        // search={search}
        // setSearch={setSearch}
        isLoading={isLoading}
      />
    </div>
  )
}

export default PageTransfer
