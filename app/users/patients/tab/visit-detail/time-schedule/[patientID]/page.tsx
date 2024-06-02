'use client'

import { useGetTimeAndWorkQuery } from '@/api/treatmentplan/timeAndWork.api'
import { useSearchParams } from 'next/navigation'

const MMASPage = () => {
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('visitID')
  const { data: vsData } = useGetTimeAndWorkQuery(appointmentID)
  console.log(vsData, 'lop')

  return (
    <div>
      MMAS Summary
      {/* {} */}
      <p>What time do you wake up time mostly wake up?</p>
      <p>What time do you leave for school or work?</p>
      <p>What time do you get to work or school?</p>
      <p>What time do you get home from work or school?</p>
    </div>
  )
}

export default MMASPage
