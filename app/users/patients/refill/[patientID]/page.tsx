'use client'

import { useGetPrescriptionQuery } from '@/api/pillbox/prescription.api'
import { useSearchParams } from 'next/navigation'

const RefillPage = () => {
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('appointmentID')
  const { data: prescriptionDatam } = useGetPrescriptionQuery(appointmentID)
  console.log(prescriptionDatam)

  return (
    <div>
        * Remaining pills from this prescription

        * If remaining give reasons

        * Select from last prescription

        * mark this appointment as completed

        * create a new appointment

        <div>

        </div>
    </div>
  )
}

export default RefillPage
