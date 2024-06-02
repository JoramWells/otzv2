'use client'

import { useGetMmasQuery } from '@/api/treatmentplan/mmas.api'
import { useSearchParams } from 'next/navigation'

const MMASpage = () => {
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('visitID')
  const { data: vsData } = useGetMmasQuery(appointmentID)
  console.log(vsData, 'lop')

  return (
    <div>
      MMAS Summary

      {/* {} */}

    </div>
  )
}

export default MMASpage
