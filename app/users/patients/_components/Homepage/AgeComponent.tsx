import { CustomTable } from '@/app/_components/table/CustomTable'
import { Badge } from '@/components/ui/badge'
import { type PatientAttributes } from 'otz-types'
import React, { Suspense, type Dispatch, type SetStateAction } from 'react'
import { patientColumns } from '../columns'

interface AgeComponentInputProps {
  title: string
  total: number
  data?: PatientAttributes[]
  isLoading: boolean
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

const AgeComponent = ({ title, total, data, isLoading, search, setSearch }: AgeComponentInputProps) => {
  return (
    <Suspense
    fallback={<div>loading...</div>}
    >
      <div className="bg-white rounded-lg">
        <div className="p-4 pb-0 flex flex-row space-x-2 items-center">
          <p className="text-slate-700 text-[16px] ">
            {title}
          </p>
          <Badge className="bg-slate-200 hover:bg-slate-100 text-slate-700 shadow-none">
            {total}
          </Badge>
        </div>
        <CustomTable
          columns={patientColumns}
          data={data ?? []}
          total={total}
          isLoading={isLoading}
          search={search}
          setSearch={setSearch}
          // filter={<FilterComponent />}
          // isSearch
        />
      </div>
    </Suspense>
  )
}

export default AgeComponent
