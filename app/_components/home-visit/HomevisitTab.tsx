/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetMmasQuery } from '@/api/treatmentplan/mmas.api'
import { CustomTable } from '../table/CustomTable'
import { columns } from './columns'
import { useGetAllHomeVisitsQuery, useGetHomeVisitQuery } from '@/api/homevisit/homeVisit.api'
import { Clock } from 'lucide-react'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

export interface HomeVisitProps {
  patientID: string
}

const HomeVisitTab = ({ patientID }: HomeVisitProps) => {
  const { data } = useGetHomeVisitQuery(patientID)

  return (
    <div
    className='w-full justify-center items-center flex flex-col'
    >
      <div className="w-1/2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center space-x-2">
            <p className="text-lg font-semibold text-slate-700">
              Recent Home Visits
            </p>
          </div>
          <Button size={'sm'} colorScheme="green" variant={'outline'}>
            <Link href={`/reports/add-home-visit/${patientID}`}>NEW</Link>
          </Button>
        </div>
        <div className="mt-4 w-full">
          {/* <CustomTable columns={columns} data={data ?? []}
          isSearch={false}
          /> */}
        </div>
      </div>
    </div>
  )
}

export default HomeVisitTab
