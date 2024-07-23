/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from './columns'
import { useCallback, useMemo, useState } from 'react'
import CustomTab from '../../../components/tab/CustomTab'
import { useGetAllPrescriptionsQuery } from '@/api/pillbox/prescription.api'
import { calculateAdherence } from '@/utils/calculateAdherence'

const SMSPage = () => {
  const [value, setValue] = useState('')

  const { data } = useGetAllPrescriptionsQuery()

  const filterData = useCallback(() => {
    const prescriptionCopy = data ? [...data] : []
    // data less than zero
    const adherence = prescriptionCopy.filter((item => calculateAdherence(item.refillDate, item.computedNoOfPills as unknown as number, item.frequency) < 50))
    return adherence.sort(
      (a, b) => new Date(b.createdAt as unknown as string).getTime() - new Date(a.createdAt as unknown as string).getTime()
    ) || []
  }, [data])()

  const categoryList = useMemo(
    () => [
      {
        id: 1,
        label: 'Drug Resistance'
      },
      {
        id: 2,
        label: 'Inconsistencies'
      },
      {
        id: 3,
        label: 'High Baseline'
      }
    ],
    []
  )

  console.log(data, 'lki')

  return (
    <div className="p-4 ">
      <CustomTab
        categoryList={categoryList}
        value={value}
        setValue={setValue}
      />

      {/* tab navigation */}

      <CustomTable columns={columns} data={filterData || [] } />
    </div>
  )
}

export default SMSPage
