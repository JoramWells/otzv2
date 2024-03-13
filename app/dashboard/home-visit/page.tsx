/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Button, Tag } from '@chakra-ui/react'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns, reasonColumns, type UserProps } from './columns'
import { usePathname, useRouter } from 'next/navigation'
import { useGetAllHomeVisitFrequenciesQuery } from '@/api/homevisit/homeVisitFrequency.api'
import { useState } from 'react'
import { useGetHomeVisitReasonsQuery } from '@/api/homevisit/homeVisitReason.api'

const categoryList = [
  {
    id: 1,
    text: 'Frequency'
  },
  {
    id: 2,
    text: 'Reasons'
  }
]

const HomeVisitPage = () => {
  const [value, setValue] = useState(1)
  const { data } = useGetAllHomeVisitFrequenciesQuery()
  const { data: reasonsData } = useGetHomeVisitReasonsQuery()
  console.log(reasonsData, 'dtc')

  const router = useRouter()
  const pathname = usePathname()
  const handleClick = () => {
    if (value === 1) {
      router.push(`${pathname}/add-home-visit-frequency`)
    } else {
      router.push(`${pathname}/add-home-visit-reason`)
    }
  }

  return (
    <div className="ml-64 pt-12">
      <div className="p-5">
        <div
          className="rounded-md gap-x-4
           flex flex-row mb-4
          "
        >
          {categoryList.map((item) => (
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
              {item.text}
            </Button>
          ))}
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
        {value === 1 && <CustomTable columns={columns} data={data ?? []} />}

        {/* frequency */}
        {value === 2 && <CustomTable columns={reasonColumns} data={reasonsData ?? []} />}
      </div>
    </div>
  )
}

export default HomeVisitPage
