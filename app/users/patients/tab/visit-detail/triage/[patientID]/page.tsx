'use client'

import { useGetAllVitalSignDetailQuery } from '@/api/vitalsigns/vitalSigns.api'
import { useSearchParams } from 'next/navigation'

const page = () => {
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('visitID')
  const { data: vsData } = useGetAllVitalSignDetailQuery(appointmentID)

  return (
    <div>page</div>
  )
}

export default page
