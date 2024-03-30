/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { CustomTable } from '../_components/table/CustomTable'
import { columns } from './columns'
import { useCallback, useMemo, useState } from 'react'
import { Tag } from '@chakra-ui/react'
import { type MomentInput } from 'moment'
import { calculateAge } from '@/utils/calculateAge'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ItemsProps {
  dob: MomentInput
}

async function getPatients () {
  const res = await fetch('http:/localhost:3000/api/patients')
  const data = await res.json()
  return data.data
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
    <div className="p-5">
      <div
      className='mb-4 flex flex-row justify-between items-center'
      >
        <p className="text-lg font-bold">Registered Patients</p>
        <Button className='bg-teal-600 hover:bg-teal-700
        font-bold shadow-none
        '
        onClick={() => { router.push('/patients/add-patients') }}
        >
          <PlusCircle size={18} className='mr-2' />
          New Patient</Button>
      </div>

      <div
        className="flex flex-row space-x-8
      border-b mt-4 mb-6
      "
      >
        {categoryList.map((item) => (
          <Button
            key={item.id}
            // rounded={'0'}
            // h={10}
            size={'sm'}
            // w={'full'}
            // borderBottom={`${value === item.id ? '2px' : '0'}`}
            // fontWeight={`${value === item.id ? 'bold' : 'bold'}`}
            // bgColor={`${value === item.id ? "teal.50" : "transparent"}`}
            // color={`${value === item.id ? 'teal' : 'gray.500'}`}
            // bgColor={'white'}
            // p={1}
            // shadow={`${value === item.id && 'md'}`}

            onClick={() => {
              setValue(item.id)
            }}
            // display={'flex'}
            // flexDirection={'column'}
            // justifyContent={'flex-start'}
            // padding={2}
            // height={14}
            // alignItems={'flex-start'}
            className={`bg-white text-slate-600 shadow-none
            border-b-2 border-teal-600 rounded-none ${value !== item.id && 'border-none'}
            ${value === item.id && 'text-teal-600'} font-bold hover:bg-slate-50
            `}
          >
            <div className="flex items-center space-x-2">
              <p className="text-[16px]">{item.label}</p>
              <Tag
                rounded={'full'}
                colorScheme={value === item.id ? 'orange' : 'gray'}
                size={'sm'}
              >
                {item.count}
              </Tag>
            </div>
            {/* <p className="mt-1 font-normal text-slate-500">
                {item.description}
              </p> */}
          </Button>
        ))}
      </div>

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
