/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Button, Tag } from '@chakra-ui/react'
import { CustomTable } from '../../_components/table/CustomTable'
import { curriculumSubCategoryColumns, curriculumCategoryColumns, classesColumn, holidaysColumn } from './columns'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useGetAllCurriculumCategoriesQuery } from '@/api/school/curriculumCategory.api'
import { useGetAllSchoolSubCurriculumsQuery } from '@/api/school/curriculumSubCategory.api'
import { useGetAllSchoolClassesQuery } from '@/api/school/schoolClasses.api'
import { useGetAllSchoolTermHolidaysQuery } from '@/api/school/schoolTermHoliday.api'
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

const School = () => {
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
    <div className="ml-64 pt-12">
      <div className="p-5">
        <div className="flex flex-col gap-y-2 mb-4">
          <p className="font-bold text-xl">Categories</p>
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
        </div>
        <div className="flex flex-row justify-between items-center p-1">
          <div className="flex flex-row gap-x-2 items-center mb-2 mt-4">
            <p className="text-lg text-slate-700">
              {value === 1
                ? 'Classes'
                : value === 2
                  ? 'Category'
                  : value === 3
                    ? 'Sub-category'
                    : value === 4
                      ? 'Holidays'
                      : 'Schools'}
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
        </div>
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
          <CustomTable columns={holidaysColumn} data={holidaysData ?? []} />
        )}
        {value === 5 && (
          <CustomTable columns={holidaysColumn} data={holidaysData ?? []} />
        )}
      </div>
    </div>
  )
}

export default School
