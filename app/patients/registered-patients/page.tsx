/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from '../columns'
import { useCallback, useMemo, useState } from 'react'
import { Tag } from '@chakra-ui/react'
import { type MomentInput } from 'moment'
import { calculateAge } from '@/utils/calculateAge'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import CustomTab from '../../_components/tab/CustomTab'

interface ItemsProps {
  dob: MomentInput
}

const Patients = () => {
  // const datax = await getPatients()
  const { data } = useGetAllPatientsQuery()
  const [value, setValue] = useState<number>(1)

  const paedData = useCallback(() => {
    const dtx = data?.filter((item: ItemsProps) => {
      const age = calculateAge(item.dob)
      return age >= 0 && age <= 9
    })
    return dtx
  }, [data])

  // otz
  const otzData = useCallback(() => {
    const dtx = data?.filter((item: ItemsProps) => {
      const age = calculateAge(item.dob)
      return age >= 9 && age <= 19
    })
    return dtx
  }, [data])

  // otz plus
  const otzPlusData = useCallback(() => {
    const dtx = data?.filter((item: ItemsProps) => {
      const age = calculateAge(item.dob)
      return age >= 19 && age <= 24
    })
    return dtx
  }, [data])

  // otz plus
  const adultData = useCallback(() => {
    const dtx = data?.filter((item: ItemsProps) => {
      const age = calculateAge(item.dob)
      return age >= 24
    })
    return dtx
  }, [data])

  console.log(paedData(), 'dtc')

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
        label: 'Paeds',
        description: '0 yrs to 9 yrs',
        count: paedData()?.length
      },
      {
        id: 3,
        label: 'OTZ',
        description: '10 yrs to 19 yrs',
        count: otzData()?.length
      },
      {
        id: 4,
        label: 'OTZ plus',
        description: '20 yrs to 24 yrs',
        count: otzPlusData()?.length
      },
      {
        id: 5,
        label: 'Adults',
        description: 'Above 25 yrs',
        count: adultData()?.length
      }
    ],
    [data?.length, paedData, otzData, otzPlusData, adultData]
  )

  const router = useRouter()

  return (
    <div className="p-5 mt-12">
      <div className="mb-4 flex flex-row justify-between items-center">
        <p className="text-lg font-bold">Registered Patients</p>
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
        value={value}
        setValue={setValue}
      />

      {value === 1 && <CustomTable columns={columns} data={data || []} />}

      {value === 2 && <CustomTable columns={columns} data={paedData() || []} />}

      {value === 3 && <CustomTable columns={columns} data={otzData() || []} />}

      {/* plus */}
      {value === 4 && (
        <CustomTable columns={columns} data={otzPlusData() || []} />
      )}

      {/* adult */}
      {value === 5 && (
        <CustomTable columns={columns} data={adultData() || []} />
      )}
    </div>
  )
}

export default Patients
