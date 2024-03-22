/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { CustomTable } from '../_components/table/CustomTable'
import { columns } from './columns'
import { useCallback, useMemo, useState } from 'react'
import { Button, Tag } from '@chakra-ui/react'
import { type MomentInput } from 'moment'
import { calculateAge } from '@/utils/calculateAge'

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
        description: 'All registered patients',
        count: data?.length
      },
      {
        id: 2,
        label: 'Paeds',
        description: 'Between 0 yrs to 9 yrs',
        count: paedData()?.length
      },
      {
        id: 3,
        label: 'OTZ',
        description: 'Between 9 yrs to 19 yrs',
        count: otzData()?.length
      },
      {
        id: 4,
        label: 'OTZ plus',
        description: 'Between 19 yrs to 24 yrs',
        count: otzPlusData()?.length
      },
      {
        id: 5,
        label: 'Adults',
        description: 'Above 24 yrs',
        count: adultData()?.length
      }
    ],
    [data?.length, paedData, otzData, otzPlusData, adultData]
  )

  return (
    <div className="ml-64 pt-12">
      <div className="p-5">
        <p className="mb-4 text-xl font-semibold text-slate-700">
          Registered Patients
        </p>

        <div
          className="flex flex-row space-x-4
      border-b mt-6 mb-6
      "
        >
          {categoryList.map((item) => (
            <Button
              key={item.id}
              rounded={'0'}
              h={10}
              size={'sm'}
              // w={'full'}
              borderBottom={`${value === item.id ? '2px' : '0'}`}
              fontWeight={`${value === item.id ? 'bold' : 'bold'}`}
              // bgColor={`${value === item.id ? "teal.50" : "transparent"}`}
              color={`${value === item.id ? 'teal' : 'gray.500'}`}
              bgColor={'white'}
              p={1}
              // shadow={`${value === item.id && 'md'}`}
              _hover={
                {
                  // bgColor: `${value === item.id && 'black'}`,
                  // color: `${value === item.id && 'white'}`
                }
              }
              onClick={() => {
                setValue(item.id)
              }}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'flex-start'}
              // padding={2}
              height={14}
              alignItems={'flex-start'}
            >
              <div className="flex items-center space-x-2">
                <p className="text-[16px]">{item.label}</p>
                <Tag
                  rounded={'full'}
                  colorScheme={value === item.id ? 'orange' : ''}
                >
                  {item.count}
                </Tag>
              </div>
              <p className="mt-1 font-normal text-slate-500">
                {item.description}
              </p>
            </Button>
          ))}
        </div>

        {value === 1 && <CustomTable columns={columns} data={data || []} />}

        {value === 2 && (
          <CustomTable columns={columns} data={paedData() || []} />
        )}

        {value === 3 && (
          <CustomTable columns={columns} data={otzData() || []} />
        )}

        {/* plus */}
        {value === 4 && (
          <CustomTable columns={columns} data={otzPlusData() || []} />
        )}

        {/* adult */}
        {value === 5 && (
          <CustomTable columns={columns} data={adultData() || []} />
        )}
      </div>
    </div>
  )
}

export default Patients
