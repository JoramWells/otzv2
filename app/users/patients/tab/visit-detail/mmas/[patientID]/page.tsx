'use client'

import { useGetMmasEightQuery } from '@/api/treatmentplan/mmasEight.api'
import { useSearchParams } from 'next/navigation'

const MMASPage = () => {
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('visitID')
  const { data: vsData } = useGetMmasEightQuery(appointmentID as unknown as string)
  console.log(vsData, 'lop')

  return (
    <div>
      MMAS Summary

      {/* {} */}

    </div>
  )
}

export default MMASPage
