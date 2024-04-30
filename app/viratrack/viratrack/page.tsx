/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from '../columns'
import { useMemo, useState } from 'react'
// import { Tag } from '@chakra-ui/react'
// import { type MomentInput } from 'moment'
// import { calculateAge } from '@/utils/calculateAge'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import CustomTab from '../../_components/tab/CustomTab'
import { useGetAllViralLoadTestsQuery } from '@/api/enrollment/viralLoadTests.api'

// interface ItemsProps {
//   dob: MomentInput
// }

const TrackPage = () => {
  // const datax = await getPatients()
  const { data } = useGetAllPatientsQuery()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const [value, setValue] = useState<string | null>(tab)
  const { data: vlData } = useGetAllViralLoadTestsQuery()

  const categoryList = useMemo(
    () => [
      {
        id: 1,
        label: 'All',
        description: 'All patients',
        count: data?.length
      },
      {
        id: 2,
        label: 'Early Years',
        description: '0 yrs to 9 yrs'
      },
      {
        id: 3,
        label: 'Middle School',
        description: '10 yrs to 19 yrs'
      },
      {
        id: 4,
        label: 'Senior',
        description: 'Tertiary'
      },
      {
        id: 5,
        label: 'Tertiary ',
        description: 'Tertiary'
      }
    ],
    [data?.length]
  )

  const router = useRouter()

  return (
    <div className="p-4 mt-14">
      <div className="mb-4 flex flex-row justify-between items-center">
          <p className="text-2xl font-bold">Welcome to ViraTrack</p>

        <Button
          className="bg-teal-600 hover:bg-teal-700
        font-bold shadow-none
        "
          onClick={() => {
            router.push('/patients/add-patients')
          }}
        >
          <PlusCircle size={18} className="mr-2" />
          New Patient
        </Button>
      </div>

      <CustomTab
        categoryList={categoryList}
        setValue={setValue}
        value={value}
      />

      <CustomTable columns={columns} data={vlData || []} />

    </div>
  )
}

export default TrackPage
