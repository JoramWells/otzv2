/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from './columns'
// import { useGetAllPrescriptionsQuery } from '@/api/pillbox/artPrescription.api'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { useGetAllPrescriptionsQuery } from '@/api/pillbox/prescription.api'
import CustomTab from '@/components/tab/CustomTab'
import { useState } from 'react'
import { calculateAge } from '@/utils/calculateAge'

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
    label: 'dashboard',
    link: '/dashboard'
  },
  {
    id: '3',
    label: 'prescription',
    link: '/prescription'
  }
]

const PrescriptionPage = () => {
  const { data } = useGetAllPrescriptionsQuery({
    mode: undefined
  })

  let sortedData = data ? [...data] : []
  sortedData = sortedData.filter(item => calculateAge(item.Patient.dob) < 25)
  sortedData.sort(
    (a, b) => new Date(b.createdAt as unknown as string).getTime() - new Date(a.createdAt as unknown as string).getTime()
  )

  console.log(sortedData, 'sortedData')

  // active prescriptions
  const activeData = sortedData?.filter(item => item.expectedNoOfPills && item.expectedNoOfPills > 0)
  const nonActive = sortedData?.filter(item => item.expectedNoOfPills && item.expectedNoOfPills < 0)

  const [tabValue, setTabValue] = useState('all')

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2">
        <div className="bg-white rounded-lg p-4">
          <p className="font-semibold">
            Current Prescriptions{' '}
            <span className="text-slate-500 text-[14px] ">
              ({sortedData?.length || 0})
            </span>
          </p>
          <CustomTab
            value={tabValue}
            setValue={setTabValue}
            categoryList={[
              {
                id: 1,
                label: 'All',
                count: sortedData?.length
              },
              {
                id: 2,
                label: 'Active',
                count: activeData?.length
              },
              {
                id: 3,
                label: 'Not Active',
                count: nonActive?.length
              }
            ]}
          />
<div className='mb-2' />
          {tabValue === 'all' && (
            <CustomTable columns={columns} data={sortedData || []} />
          )}
          {tabValue === 'active' && (
            <CustomTable columns={columns} data={activeData || []} />
          )}
          {tabValue === 'not active' && (
            <CustomTable columns={columns} data={nonActive || []} />
          )}
        </div>
      </div>
    </>
  )
}

export default PrescriptionPage
