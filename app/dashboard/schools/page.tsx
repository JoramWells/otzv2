/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Button, Tag } from '@chakra-ui/react'
import { CustomTable } from '../../_components/table/CustomTable'
import { curriculumSubCategoryColumns, curriculumCategoryColumns, classesColumn, holidaysColumn } from './columns'
import { usePathname, useRouter } from 'next/navigation'
import { useGetAllHomeVisitFrequenciesQuery } from '@/api/homevisit/homeVisitFrequency.api'
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
  const handleClick = () => {
    router.push(`${pathname}/add-user`)
  }

  return (
    <div className="ml-64 pt-12">
      <div className="p-5">
        <div className="flex flex-row gap-x-2">
          <div
            className="p-2 bg-gray-50 border rounded-md gap-x-2
          justify-between flex flex-row
          "
          >
            {categoryList.map((item) => (
              <Button
                key={item.id}
                rounded={'md'}
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

          {value}
        </div>
        <div className="flex flex-row justify-between items-center p-1">
          <div className="flex flex-row gap-x-2 items-center mb-2 mt-4">
            <p className="text-lg text-slate-700">Curriculum Sub Category</p>
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
            variant={'outline'}
            onClick={handleClick}
          >
            {value === 1 '/dashboard/add-classes' ? value === 2? '/dashboard/add-category': ''}
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
