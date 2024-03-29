/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useGetCaregiverQuery } from '@/api/caregiver/caregiver.api'
import { Button } from '@/components/ui/button'
import { Avatar } from '@chakra-ui/react'
import { Copy } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Page = ({ params }: any) => {
  const router = useRouter()
  const patientID = params.patientID
  const { data } = useGetCaregiverQuery(patientID)
  return (
    <div
      className="flex flex-col justify-center
    items-center  w-full p-4 mt-12"
    >
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-bold text-xl">Cares Givers</p>

        <Button
          className="transition ease-in-out bg-teal-600 hover:bg-teal-700
      shadow-none transform font-bold hover:scale-105
      "
          // size={'sm'}
          onClick={() => router.push(`/caregiver/add-care-giver/${patientID}`)}
        >
          New
        </Button>

      </div>

      {/* ceck if ter is cariver */}
      {data?.length === 0 && (
        <p className="text-xl font-bold text-slate-500">
          This Patient has No Caregiver
        </p>
      )}

      {/* iterate over te creivers */}
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
