/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Button, Tag } from '@chakra-ui/react'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns, subCountyColumns } from './columns'
import { usePathname, useRouter } from 'next/navigation'
import { useGetAllOccupationQuery } from '@/api/occupation.api'
import { useState } from 'react'
import { useGetAllCountiesQuery } from '@/api/location/county.api'
import { useGetAllSubCountiesQuery } from '@/api/location/subCounty.api'

const categoryList = [
  {
    id: 1,
    text: 'County'
  },
  {
    id: 2,
    text: 'Sub County'
  },
  {
    id: 3,
    text: 'Ward'
  }
]

const Occupations = () => {
  const [value, setValue] = useState(1)

  const { data } = useGetAllCountiesQuery()
  const { data: subCountyData } = useGetAllSubCountiesQuery()
  console.log(subCountyData, 'dtc')

  const router = useRouter()
  const pathname = usePathname()
  const handleClick = () => {
    router.push(`${pathname}/add-occupation`)
  }

  return (
    <div className="ml-64 pt-12">
      <div className="p-5">
        {/*  */}
        <div
          className="rounded-md gap-x-4
           flex flex-row
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
              Occupations
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

        {value === 2 && <CustomTable columns={subCountyColumns} data={subCountyData ?? []} />}
      </div>
    </div>
  )
}

export default Occupations
