/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useGetCaregiverQuery } from '@/api/caregiver/caregiver.api'
import { Avatar } from '@chakra-ui/react'
import { Copy } from 'lucide-react'

const Page = ({ params }: any) => {
  const patientID = params.patientID
  const { data } = useGetCaregiverQuery(patientID)
  return (
    <div
      className="flex flex-col justify-center
    items-center  w-full p-4"
    >
      {data?.map((item: any) => (
        <div
          key={item.id}
          className="w-1/2 border
             border-slate-200 p-4 rounded-lg"
        >
          <Avatar name={item?.firstName} size={'sm'} />
          <p>
            {' '}
            {item?.firstName} {item?.middleName}{' '}
          </p>
          <div
          onClick={async () => {
            await navigator.clipboard.writeText(item?.phoneNo)
          }}
          >
            <Copy />
            {item?.phoneNo}
           </div>
        </div>
      ))}
    </div>
  )
}

export default Page
