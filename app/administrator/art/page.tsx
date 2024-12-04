/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useState } from 'react'
import Regimen from './_components/regimen/Regimen'
import ArtCategory from './_components/ArtCategory'
import MeasuringUnit from './_components/measuringUnit/MeasuringUnit'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import CustomTab from '@/components/tab/CustomTab'
import ArtSwitchReason from './_components/regimen/ArtSwitchReason'
import VLJustification from './_components/VLJustification/VLJustification'

//
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[38px] rounded-lg" />
  }
)

const categoryList = [
  {
    id: 1,
    label: "ART",
  },
  {
    id: 2,
    label: "Category",
  },
  {
    id: 4,
    label: "ART Switch Reasons",
  },
  {
    id: 5,
    label: "Measuring Unit",
  },
  {
    id: 6,
    label: "VL Justification",
  },
];

const Art = () => {
  const [value, setValue] = useState('art')

  const dataList = [
    {
      id: '1',
      label: 'home',
      link: '/'
    },
    {
      id: '2',
      label: 'drugs',
      link: 'art'
    }
  ]

  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList} />

      <div className="mt-4">
        <CustomTab
          setValue={setValue}
          value={value}
          categoryList={categoryList}
        />
      </div>

      {/* art details */}
      <div className="p-2 w-full">
        {value === "art" && <Regimen />}

        {/* art category */}
        {value === "category" && <ArtCategory />}

        {value === "ART Switch Reasons".toLowerCase() && <ArtSwitchReason />}

        {value === "Measuring Unit".toLowerCase() && <MeasuringUnit />}
        {value === "VL Justification".toLowerCase() && <VLJustification />}
      </div>
    </div>
  );
}

export default Art
