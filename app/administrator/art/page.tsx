/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { artSwitchReasonColumns, columns } from './columns'
import { useGetAllArtRegimenPhaseQuery } from '@/api/art/artRegimenPhase.api'
import { useState } from 'react'
import { useGetAllArtSwitchReasonsQuery } from '@/api/art/artSwitchReason.api'
import Regimen from './_components/regimen/Regimen'
import ArtCategory from './_components/ArtCategory'
import MeasuringUnit from './_components/measuringUnit/MeasuringUnit'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import CustomTab from '@/components/tab/CustomTab'

//
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[36px] rounded-lg" />
  }
)

const categoryList = [
  {
    id: 1,
    label: 'ART'
  },
  {
    id: 2,
    label: 'Category'
  },
  {
    id: 3,
    label: 'Phases'
  },
  {
    id: 4,
    label: 'ART Switch Reasons'
  },
  {
    id: 5,
    label: 'Measuring Unit'
  }
]

const Art = () => {
  const [value, setValue] = useState('art')

  const { data } = useGetAllArtRegimenPhaseQuery()
  const { data: artSwitchReasonsData } = useGetAllArtSwitchReasonsQuery()

  const dataList = [
    {
      id: '1',
      label: 'home',
      link: ''
    },
    {
      id: '2',
      label: 'drugs',
      link: 'art'
    }
  ]

  return (
    <div className="p-2">
      <BreadcrumbComponent dataList={dataList} />

      <div
      className='mt-2'
      >
        <CustomTab
          setValue={setValue}
          value={value}
          categoryList={categoryList}
        />
      </div>

      {/* art details */}
      {value === 'art' && <Regimen />}

      {/* art category */}
      {value === 'category' && <ArtCategory />}

      {/* art phases */}
      {value === 'phases' && (
        <CustomTable columns={columns} data={data ?? []} />
      )}
      {value === 'ART Switch Reasons'.toLowerCase() && (
        <div>
          <p className="mb-3 text-slate-700">
            Reasons for SWITCH to 2nd line or Higher
          </p>
          <CustomTable
            columns={artSwitchReasonColumns}
            data={artSwitchReasonsData ?? []}
          />
        </div>
      )}

      {value === 'Measuring Unit'.toLowerCase() && <MeasuringUnit />}
    </div>
  )
}

export default Art
