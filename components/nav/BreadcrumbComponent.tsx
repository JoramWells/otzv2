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
  return (
    <Breadcrumb className="pl-4 pr-4 pt-2 pb-2 bg-white flex justify-between items-center ">
      <BreadcrumbList>
        {dataList.map((item, index) => (
          <Fragment key={item.id}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.link} className={`capitalize text-[12px] ${index === dataList.length - 1 && 'text-blue-500'} `}>
                {item.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== dataList.length - 1 && <BreadcrumbSeparator />}

          </Fragment>
        ))}
      </BreadcrumbList>
      <div
      className='flex space-x-2 items-center'
      >
        <p
        className='text-[12px] font-semibold text-slate-700'
        >
          {data?.hospitalName}
        </p>
        <p
        className='text-slate-500 text-[12px]'
        >
          {data?.mflCode}
        </p>
      </div>
    </Breadcrumb>
  )
}
