/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { curriculumSubCategoryColumns, curriculumCategoryColumns, classesColumn, holidaysColumn } from './columns'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useGetAllCurriculumCategoriesQuery } from '@/api/school/curriculumCategory.api'
import { useGetAllSchoolSubCurriculumsQuery } from '@/api/school/curriculumSubCategory.api'
import { useGetAllSchoolClassesQuery } from '@/api/school/schoolClasses.api'
import { useGetAllSchoolTermHolidaysQuery } from '@/api/school/schoolTermHoliday.api'
import School from '@/app/_components/school/School'
import Holidays from '@/app/_components/school/Holidays'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import CustomTab from '@/components/tab/CustomTab'

//
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none m-0" />
  }
)

// cbc
// const CBCCurriculum = [
//   {
//     level: 'Early Years Education',
//     division: {
//       name: ['PP1', 'PP2']
//     }
//   },
//   {
//     level: 'Middle School'
//   },
//   {
//     level: 'Senior School'
//   },
//   {
//     level: 'Tertiary Education'
//   }
// ]
const categoryList = [
  {
    id: 1,
    label: 'Classes'
  },
  {
    id: 2,
    label: 'Curriculum Category'
  },
  {
    id: 3,
    label: 'Curriculum Sub-category'
  },
  {
    id: 4,
    label: 'Holidays'
  },
  {
    id: 5,
    label: 'Schools'
  }
]

const dataList = [
  {
    id: '1',
    label: 'Home',
    link: ''
  },
  {
    id: '2',
    label: 'Home Visit',
    link: 'home-visit'
  }
]

const SchoolPage = () => {
  const [value, setValue] = useState('classes')
  const [mapValue, setMapValue] = useState(1)
  const { data } = useGetAllCurriculumCategoriesQuery()
  const { data: curriculumSubCategory } = useGetAllSchoolSubCurriculumsQuery()
  const { data: classesData } = useGetAllSchoolClassesQuery()
  const { data: holidaysData } = useGetAllSchoolTermHolidaysQuery()
  console.log(holidaysData, 'dtc')

  const router = useRouter()
  const pathname = usePathname()
  const handleClick = (selectedValue: number) => {
    if (selectedValue === 1) {
      router.push(`${pathname}/add-classes`)
    } else if (selectedValue === 2) {
      router.push(`${pathname}/add-category`)
    } else if (selectedValue === 3) {
      router.push(`${pathname}/add-sub-category`)
    } else if (selectedValue === 4) {
      router.push(`${pathname}/add-holidays`)
    }
    router.push(`${pathname}/add-school`)
  }

  return (
    <>
      <BreadcrumbComponent dataList={dataList} />

      <div className="p-2 bg-white mt-2">
        <h1 className="font-bold">Competency Based Curriculum (CBC) </h1>
      </div>

      <div className="flex flex-col gap-y-2 mb-1 mt-1">
        <CustomTab
          categoryList={categoryList}
          value={value}
          setValue={setValue}
        />
      </div>

      <div className="p-2 w-full">
        <div
        className='p-4 bg-white rounded-lg'
        >
          {value === 'classes' && (
            <CustomTable columns={classesColumn} data={classesData ?? []} />
          )}
          {value === 'Curriculum Category'.toLowerCase() && (
            <CustomTable
              columns={curriculumCategoryColumns}
              data={data ?? []}
            />
          )}
          {value === 'Curriculum Sub-category'.toLowerCase() && (
            <CustomTable
              columns={curriculumSubCategoryColumns}
              data={curriculumSubCategory ?? []}
            />
          )}
          {value === 'Holidays'.toLowerCase() && (
            <Holidays
              handleClick={() => handleClick(mapValue)}
              value={mapValue}
            />
          )}
          {value === 'Schools'.toLowerCase() && (
            <School
              handleClick={() => handleClick(mapValue)}
              value={mapValue}
              column={holidaysColumn}
              data={holidaysData}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default SchoolPage
