/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import CustomSelectParams, { type DataItem } from '@/components/forms/CustomSelectParams'
import { pageNumber } from '@/utils/pageNumber'
import { type Dispatch, type SetStateAction } from 'react'

interface PatientFilterInputProps {
  age: string | null
  caseManager: string
  caseManagerOptions?: DataItem[]
  total?: number | string
  pageSize: number
  setAge: Dispatch<SetStateAction<string | null>>
  setPageSize: Dispatch<SetStateAction<number>>
  setCaseManager: Dispatch<SetStateAction<string>>
}

function PatientFilter ({
  age,
  setAge,
  pageSize,
  setPageSize,
  total,
  caseManager,
  setCaseManager,
  caseManagerOptions
}: PatientFilterInputProps) {
  return (
    <div className="flex flex-row space-x-2 items-center">
      <CustomSelectParams
        label="Age (years)"
        onChange={setAge}
        paramValue="tab"
        value={age as string}
        data={[
          {
            id: 'All',
            label: 'All'
          },
          {
            id: '0-9 years',
            label: '01-09'
          },
          {
            id: '10-14 years',
            label: '10-14'
          },
          {
            id: '15-20 years',
            label: '15-19'
          },
          {
            id: '20 years',
            label: '20-24'
          }
        ]}
        placeholder="Age"
      />
      <CustomSelectParams
        label={`Page No :- ${pageNumber(total as number, 10)}`}
        paramValue="page"
        onChange={setPageSize}
        value={`${pageSize}`}
        data={Array.from(
          { length: pageNumber(total as number, 10) },
          (_, index) => ({ id: `${index + 1}`, label: `${index + 1}` })
        )}
        placeholder="Page"
      />
      <CustomSelectParams
        label={`Case Managers :- ${pageNumber(total as number, 10)}`}
        paramValue="casemanager"
        onChange={setCaseManager}
        value={caseManager}
        data={caseManagerOptions ?? []}
        placeholder="Case Manager"
      />
    </div>
  )
}

export default PatientFilter
