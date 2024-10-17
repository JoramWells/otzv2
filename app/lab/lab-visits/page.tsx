/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Button } from '@chakra-ui/react'
import { CustomTable } from '../../_components/table/CustomTable'
import { useGetAllInternalLabRequestsQuery } from '@/api/viraload/internalLabRequest.api'
import { useState } from 'react'
import { columns } from './columns'

// const testsLists = [
//   {
//     id: 1,
//     label: 'CD4'
//   },
//   {
//     id: 2,
//     label: 'Viral Load'
//   },
//   {
//     id: 3,
//     label: 'TB'
//   }
// ]

const categoryList = [
  {
    id: 1,
    label: 'All'
  },
  {
    id: 2,
    label: 'Cancelled'
  },
  {
    id: 3,
    label: 'Rescheduled'
  },
  {
    id: 4,
    label: 'Upcoming'
  },
  {
    id: 5,
    label: 'Missed'
  }
]

const LabPage = () => {
  // const datax = await getPatients()
  const { data } = useGetAllInternalLabRequestsQuery()
  const [value, setValue] = useState<number>(1)

  return (
    <div className="ml-64 pt-12">
      <div className="p-5">
        <p className="mb-4 text-xl font-semibold text-slate-700">Lab Visits</p>
        {/* <div
          className="rounded-md gap-x-4
           flex flex-row mb-4
          "
        >
          {testsLists.map((item) => (
            <Button
              key={item.id}
              rounded={'full'}
              size={'sm'}
              bgColor={`${value === item.id && 'gray.700'}`}
              color={`${value === item.id && 'white'}`}
              // shadow={`${value === item.id && 'md'}`}
              _hover={{
                bgColor: `${value === item.id && 'black'}`,
                color: `${value === item.id && 'white'}`
              }}
              onClick={() => {
                setValue(item.id)
              }}
            >
              {item.label}
            </Button>
          ))}
        </div> */}

        <div
          className="flex flex-row space-x-4
      border-b mb-4
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
              fontWeight={`${value === item.id ? 'bold' : 'normal'}`}
              bgColor={`${value === item.id ? 'teal.50' : 'transparent'}`}
              color={`${value === item.id ? 'teal' : 'gray.500'}`}
              // bgColor={'white'}
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
            >
              {item.label}
            </Button>
          ))}
        </div>
        <CustomTable columns={columns} data={data || []} />
      </div>
    </div>
  )
}

export default LabPage
