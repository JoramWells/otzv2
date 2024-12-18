/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import { useGetHospitalQuery } from '@/api/hospital/hospital.api'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { useUserContext } from '@/context/UserContext'
import { Fragment } from 'react'
import { Button } from '../ui/button'
import { Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DataListProps {
  dataList: Array<{
    id: string
    label: string
    link: string
  }>

}

export default function BreadcrumbComponent ({ dataList }: DataListProps) {
  const { hospitalID } = useUserContext()
  const { data } = useGetHospitalQuery(hospitalID as string, {
    skip: hospitalID == null
  })
  const router = useRouter()
  return (
    <Breadcrumb className="p-2 pl-4 pr-4 bg-white flex justify-between items-center ">
      <BreadcrumbList>
        {dataList.map((item, index) => (
          <Fragment key={item.id}>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={item.link}
                className={`capitalize text-[12px] ${
                  index === dataList.length - 1 && 'text-cyan-500'
                } `}
              >
                {item.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== dataList.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
      <div className='flex flex-row space-x-2'>
        <Button
        className='shadow-none'
        variant={'ghost'}
        size={'sm'}
        onClick={() => router.push('/notify/notifications')}
        >
          <Bell size={16} className='text-slate-500' />
        </Button>
        <Button
          className="flex space-x-2 items-center shadow-none"
          size={'sm'}
          variant={'outline'}
        >
          <p className="text-[12px] font-semibold text-slate-700">
            {data?.hospitalName?.substring(0, 10)}..
          </p>
        </Button>
      </div>
    </Breadcrumb>
  )
}
