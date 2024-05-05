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
import { Button } from '@/components/ui/button'
import { BreadcrumbComponent } from '@/components/nav/BreadcrumbComponent'
const categoryList = [
  {
    id: 1,
    text: 'Classes'
  },
  {
    id: 2,
    text: 'Curriculum Category'
  },
  {
    id: 3,
    text: 'Curriculum Sub-category'
  },
  {
    id: 4,
    text: 'Holidays'
  },
  {
    id: 5,
    text: 'Schools'
  }
]

const dataList = [
  {
    id: '1',
    label: 'home',
    link: ''
  },
  {
    id: '2',
    label: 'Lab',
    link: 'lab'
  }
]

const SchoolPage = () => {
  const [value, setValue] = useState(1)
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
    <div className="p-4">
      <div className="flex flex-col gap-y-2 mb-4">
        <BreadcrumbComponent dataList={dataList} />
        <div
          className="rounded-md gap-x-4 bg-white p-2
           flex flex-row
          "
        >
          {categoryList.map((item) => (
            <Button
              key={item.id}
              className={`rounded-full bg-slate-50 text-slate-500 hover:bg-teal-50  shadow-none ${
                value === item.id && 'bg-teal-50 text-teal-600'
              } `}
              // rounded={'full'}
              // size={'sm'}
              // bgColor={`${value === item.id && 'gray.700'}`}
              // color={`${value === item.id && 'white'}`}
              // shadow={`${value === item.id && 'md'}`}
              // _hover={{
              //   bgColor: `${value === item.id && 'black'}`,
              //   color: `${value === item.id && 'white'}`
              // }}
              onClick={() => {
                setValue(item.id)
              }}
            >
              {item.text}
            </Button>
          ))}
        </div>
      </div>
      {/* <div className="flex flex-row justify-between items-center p-1">
          <div className="flex flex-row gap-x-2 items-center mb-2 mt-4">
            <p className="text-lg text-slate-700">
              {value === 1 &&
                'Classes'}
                 {value === 2 &&
                  'Category'}
                  {value === 3 &&
                    'Sub-category'}
                    {value === 4 && 'Holidays'}
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
            // variant={'outline'}
            onClick={() => {
              handleClick(value)
            }}
            // leftIcon={<FaPlus />}
          >
            NEW
          </Button>
        </div> */}
      {value === 1 && (
        <CustomTable columns={classesColumn} data={classesData ?? []} />
      )}
      {value === 2 && (
        <CustomTable columns={curriculumCategoryColumns} data={data ?? []} />
      )}
      {value === 3 && (
        <CustomTable
          columns={curriculumSubCategoryColumns}
          data={curriculumSubCategory ?? []}
        />
      )}
      {value === 4 && (
        <Holidays handleClick={() => handleClick(value)} value={value} />
      )}
      {value === 5 && (
        <School
          handleClick={() => handleClick(value)}
          value={value}
          column={holidaysColumn}
          data={holidaysData}
        />
      )}
    </div>
  )
}

export default SchoolPage
