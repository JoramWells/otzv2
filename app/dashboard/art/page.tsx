/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Button, Tag } from '@chakra-ui/react'
import { CustomTable } from '../../_components/table/CustomTable'
import { artCategoryColumns, artColumns, artSwitchReasonColumns, columns, type UserProps } from './columns'
import { usePathname, useRouter } from 'next/navigation'
import { useGetAllArtRegimenPhaseQuery } from '@/api/art/artRegimenPhase.api'
import { useState } from 'react'
import { type ARTCategoryProps, useGetAllArtRegimenCategoriesQuery } from '@/api/art/artRegimenCategory.api'
import { useGetAllArtRegimenQuery } from '@/api/art/artRegimen.api.'
import { useGetAllArtSwitchReasonsQuery } from '@/api/art/artSwitchReason.api'

const categoryList = [
  {
    id: 1,
    text: 'ART'
  },
  {
    id: 2,
    text: 'Category'
  },
  {
    id: 3,
    text: 'Phases'
  },
  {
    id: 4,
    text: 'ART Switch Reasons'
  },
  {
    id: 5,
    text: 'Measuring Unit'
  }
]

const Art = () => {
  const [value, setValue] = useState(1)

  const { data } = useGetAllArtRegimenPhaseQuery()
  const { data: artCategoryData } = useGetAllArtRegimenCategoriesQuery()
  const { data: artData } = useGetAllArtRegimenQuery()
  const { data: artSwitchReasonsData } = useGetAllArtSwitchReasonsQuery()
  console.log(artData, 'dtc')

  const router = useRouter()
  const pathname = usePathname()

  // handle onClick button for creating new entities on the NEW button
  const handleClick = () => {
    if (value === 1) {
      router.push(`${pathname}/add-art`)
    } else if (value === 2) {
      router.push(`${pathname}/add-art-category`)
    } else if (value === 3) {
      router.push(`${pathname}/add-art-phase`)
    } else {
      router.push(`${pathname}/add-art-switch-reason`)
    }
  }

  return (
      <div className="p-5">
        <div className="flex flex-row gap-x-2">
          <div
            className="rounded-md gap-x-4
          justify-between flex flex-row mb-4
          "
          >
            {categoryList.map((item) => (
              <Button
                key={item.id}
                rounded={'full'}
                size={'sm'}
                bgColor={`${value === item.id && 'gray.700'}`}
                color={`${value === item.id ? 'white' : 'gray.500'}`}
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
          <div className="flex flex-row gap-x-2 items-center mb-4">
            <p
              className="text-lg text-slate-700
          font-semibold
          "
            >
              {value === 1
                ? 'ART Details'
                : value === 2
                  ? 'ART Categories'
                  : value === 3 ? 'ART Phases' : 'Switch Reasons'}
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
            variant={'outline'}
            onClick={handleClick}
          >
            New
          </Button>
        </div>

        {/* art details */}
        {value === 1 && (
          <CustomTable columns={artColumns} data={artData ?? []} />
        )}

        {/* art category */}
        {value === 2 && (
          <CustomTable
            columns={artCategoryColumns}
            data={artCategoryData ?? []}
          />
        )}

        {/* art phases */}
        {value === 3 && <CustomTable columns={columns} data={data ?? []} />}
        {value === 4 && (
          <div>
            <p className='mb-3 text-slate-700'>Reasons for SWITCH to 2nd line or Higher</p>
            <CustomTable columns={artSwitchReasonColumns} data={artSwitchReasonsData ?? []} />
          </div>
        )}
      </div>
  )
}

export default Art
