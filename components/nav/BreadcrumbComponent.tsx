import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Fragment } from 'react'

interface DataListProps {
  dataList: Array<{
    id: string
    label: string
    link: string
  }>

}

export default function BreadcrumbComponent ({ dataList }: DataListProps) {
  return (
    <Breadcrumb className="p-4 bg-white  ">
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
    </Breadcrumb>
  )
}
