'use client'

import { useGetAllAppModulesQuery } from '@/api/appModules/appModules.api'
// import { CustomTable } from '@/app/_components/table/CustomTable'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
// import { columns } from './columns'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'
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

const AppModulesPage = () => {
  const router = useRouter()
  const { data } = useGetAllAppModulesQuery()
  console.log(data)
  return (
    <div>
      <div
      className='relative'
      >
        <BreadcrumbComponent dataList={dataList2} />

        <Button
        className='absolute right-2 top-2'
        size={'sm'}
          onClick={() => {
            router.push('/administrator/app-modules/add')
          }}
        >
          Add
        </Button>
      </div>
      <div className="p-2">
        <div className="bg-white rounded-lg p-4">
          {/* <CustomTable columns={columns} data={data ?? []} /> */}
        </div>
      </div>
    </div>
  )
}

export default AppModulesPage
