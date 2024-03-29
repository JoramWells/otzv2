/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { CustomTable } from '../_components/table/CustomTable'
import { columns } from './columns'
import { useMemo, useState } from 'react'
// import { Tag } from '@chakra-ui/react'
// import { type MomentInput } from 'moment'
// import { calculateAge } from '@/utils/calculateAge'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import CustomTab from '../_components/tab/CustomTab'
import { useGetAllViralLoadTestsQuery } from '@/api/enrollment/viralLoadTests.api'

// interface ItemsProps {
//   dob: MomentInput
// }

const TrackPage = () => {
  // const datax = await getPatients()
  const { data } = useGetAllPatientsQuery()
  const [value, setValue] = useState<number>(1)

  const { data: vlData } = useGetAllViralLoadTestsQuery()

  console.log(vlData, 'kli')

  const categoryList = useMemo(
    () => [
      {
        id: 1,
        label: 'CD4',
        description: 'All patients',
        count: data?.length
      },
      {
        id: 2,
        label: 'TB',
        description: '0 yrs to 9 yrs'
      },
      {
        id: 3,
        label: 'Viral Load',
        description: '10 yrs to 19 yrs'
      },
      {
        id: 4,
        label: 'Vital Signs',
        description: '20 yrs to 24 yrs'
      }
    ],
    [data?.length]
  )

  const router = useRouter()

  return (
    <div className="p-5 mt-14">
      <div className="mb-4 flex flex-row justify-between items-center">
        <div>
          <p className="text-lg font-bold">Welcome to ViraTrack</p>
          <p className="text-sm text-slate-500">We track realtime VL updates, CD4 Count, Patient Vitals and TB treatment</p>
        </div>
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

      {value === 1 && <CustomTable columns={columns} data={vlData || []} />}

      {value === 2 && <CustomTable columns={columns} data={vlData || []} />}

      {value === 3 && <CustomTable columns={columns} data={vlData || []} />}

      {/* plus */}
      {value === 4 && (
        <CustomTable columns={columns} data={vlData || []} />
      )}

      {/* adult */}
      {value === 5 && (
        <CustomTable columns={columns} data={vlData || []} />
      )}
    </div>
  )
}

export default TrackPage
