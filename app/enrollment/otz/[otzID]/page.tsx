/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetViralLoadTestQuery } from '@/api/enrollment/viralLoadTests.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { Avatar, Button } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { columns } from '../columns'
import moment from 'moment'
import { AreaChart, ArrowLeftRight } from 'lucide-react'

const itemList = [
  {
    id: 1,
    text: 'Viral Load'
  },
  {
    id: 2,
    text: 'Regimen Switch'
  },
  {
    id: 3,
    text: 'Transition'
  }
]

const OTZDetail = ({ params }: any) => {
  const patientID = params.otzID
  const [value, setValue] = useState(1)

  const { data: vlData } = useGetViralLoadTestQuery(patientID)

  return (
    <div className="ml-64 pt-12">
      <div className="p-5">
        <div
          className="flex flex-row mt-4 mb-6 gap-x-4
        p-2 border rounded-lg
        "
        >
          <div
            className="flex flex-row mt-4 mb-6 gap-x-4
        "
          >
            <Avatar name="Joram Bramuel" />
            <div className="flex flex-col gap-y-1">
              <p className="font-bold">Lisa Kimani</p>
              <p className="text-slate-500 text-sm">Age: 23 yrs</p>
              <p className="text-slate-500 text-sm">Gender: female</p>
              <p className="text-slate-500 text-sm">
                Enrollment Date: {moment().format('ll')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-x-4">
          {itemList.map((item) => (
            <Button
              key={item.id}
              rounded={'full'}
              size={'sm'}
              bgColor={`${value === item.id && 'gray.700'}`}
              color={`${value === item.id ? 'white' : 'gray.600'}`}
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
        {value === 1 && (
          <>
            <div className="flex flex-row justify-between mb-3 mt-4">
              <p className="text-xl font-bold">Viral Load Tests</p>
              <Button colorScheme="green" variant={'outline'} size={'sm'}>
                <Link href={`/enrollment/otz/update-vl/${patientID}`}>NEW</Link>
              </Button>
            </div>

            <div className="flex flex-row justify-between items-center mb-3">
              <input
                placeholder="Search..."
                className="border p-2 rounded-lg"
              />
              <AreaChart
                size={30}
                className="bg-slate-100 p-1
              rounded-md hover:cursor-pointer
              "
              />
            </div>

            {/* body */}

            <CustomTable columns={columns} data={vlData || []} />
          </>
        )}

        {/* regimen switch */}
        {value === 2 && (
          <>
            <div className="flex flex-row justify-between mb-3 mt-4">
              <p className="text-xl font-bold">ART Regimen SWitch</p>
              <Button
                colorScheme="orange"
                variant={'ghost'}
                size={'sm'}
                leftIcon={<ArrowLeftRight
                size={20}
                />}
              >
                <Link
                href={`/enrollment/otz/switch-art/${patientID}`}
                >
                  SWITCH
                </Link>
              </Button>
            </div>

            <div className="flex flex-row justify-between items-center mb-3">
              <input
                placeholder="Search..."
                className="border p-2 rounded-lg"
              />
              <AreaChart
                size={30}
                className="bg-slate-100 p-1
              rounded-md hover:cursor-pointer
              "
              />
            </div>

            {/* body */}

            <CustomTable columns={columns} data={vlData || []} />
          </>
        )}
      </div>
    </div>
  )
}

export default OTZDetail
