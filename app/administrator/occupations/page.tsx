/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Button, Tag } from '@chakra-ui/react'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from './columns'
import { usePathname, useRouter } from 'next/navigation'
import { useGetAllOccupationQuery } from '@/api/occupation.api'

const Occupations = () => {
  const { data } = useGetAllOccupationQuery()
  console.log(data, 'dtc')

  const router = useRouter()
  const pathname = usePathname()
  const handleClick = () => {
    router.push(`${pathname}/add-occupation`)
  }

  return (
      <div className="p-5">
        <div
        className='flex flex-row justify-between items-center p-1'
        >
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
          colorScheme='teal'
          variant={'outline'}
          onClick={handleClick}
          >New</Button>
        </div>

        <CustomTable columns={columns} data={data ?? []} />
      </div>
  )
}

export default Occupations