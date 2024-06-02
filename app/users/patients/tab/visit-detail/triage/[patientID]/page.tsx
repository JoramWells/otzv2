'use client'

import { useGetAllVitalSignDetailQuery } from '@/api/vitalsigns/vitalSigns.api'
import { useSearchParams } from 'next/navigation'

const TriagePage = () => {
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('visitID')
  const { data: vsData } = useGetAllVitalSignDetailQuery(appointmentID)
  console.log(vsData, 'lop')

  return (
    <div>
      Vitals Summary
      <div>
        {vsData?.map((item) => (
          <div key={item.id}>
            <div>
              <p>Height </p>
              <p>{item?.height} cm </p>
            </div>
            <div>
              <p>Weight </p>
              <p>{item?.weight} cm </p>
            </div>
            <div>
              <p>Temperature: {item?.temperature} C </p>
            </div>

            <p>Blood Pressure</p>
            <div>
              <p>Systolic: {item?.systolic} C </p>
            </div>
            <div>
              <p>Diastolic: {item?.diastolic} C </p>
            </div>

            {/*  */}
            <div>
              <p>Respiratory Rate: {item?.respiratoryRate} C </p>
            </div>

            {/*  */}
            <div>
              <p>Oxygen Saturation {item?.oxygenSAturation} C </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TriagePage
