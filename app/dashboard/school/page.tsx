/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Button, Tag } from '@chakra-ui/react'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns, type UserProps } from './columns'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import { usePathname, useRouter } from 'next/navigation'
import { useGetAllHomeVisitFrequenciesQuery } from '@/api/homevisit/homeVisitFrequency.api'
import { useState } from 'react'

const School = () => {
  const [value, setValue] = useState(1)
  const { data } = useGetAllHomeVisitFrequenciesQuery()
  console.log(data, 'dtc')

  const router = useRouter()
  const pathname = usePathname()
  const handleClick = () => {
    router.push(`${pathname}/add-user`)
  }

  return (
    <div className="ml-64 pt-12">
      <div className="p-5">
        <div className="flex flex-row gap-x-2">
          <div className="p-2 bg-gray-50 border rounded-md gap-x-2
          justify-between flex flex-row
          ">
            <Button
              rounded={'md'}
              size={'sm'}
              bgColor={`${value === 1 && 'gray.700'}`}
              color={`${value === 1 && 'white'}`}
              shadow={`${value === 1 && 'md'}`}
              _hover={{
                bgColor: `${value === 1 && 'black'}`,
                color: `${value === 1 && 'white'}`
              }}
            >
              Frequency
            </Button>
            <Button
              rounded={'md'}
              size={'sm'}
              onClick={() => {
                setValue(2)
              }}
            >
              Reasons
            </Button>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center p-1">
          <div className="flex flex-row gap-x-2 items-center mb-4">
            <p
              className="text-lg text-slate-700
          font-semibold
          "
            >
              Home Reasons
            </p>
            <Tag
              m={0}
              rounded={'full'}
              fontWeight={'bold'}
              colorScheme="orange"
              size={'sm'}
            >
              {data?.length}
            </Tag>
          </div>
          <Button
            size={'sm'}
            colorScheme="teal"
            variant={'outline'}
            onClick={handleClick}
          >
            New
          </Button>
        </div>

        <CustomTable columns={columns} data={data ?? []} />
      </div>
    </div>
  )
}

export default School
