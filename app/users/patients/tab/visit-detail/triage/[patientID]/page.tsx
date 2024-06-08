/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useGetAllVitalSignDetailQuery } from '@/api/vitalsigns/vitalSigns.api'
import { Skeleton } from '@/components/ui/skeleton'
import { calculateBMI } from '@/utils/calculateBMI'
import { InfoIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
  }
)

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'dashboard',
    link: 'dashboard'
  },
  {
    id: '3',
    label: 'patients',
    link: 'patients'
  }
]

const TriagePage = () => {
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('visitID')
  const { data: vsData, isLoading, isError } = useGetAllVitalSignDetailQuery(appointmentID)
  console.log(vsData, 'lop')

  const [bmi, setBMI] = useState(0)

  useEffect(() => {
    if (vsData) {
      const BMI = calculateBMI(vsData[0]?.weight, vsData[0]?.height)
      setBMI(BMI)
    }
  }, [vsData])

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="flex justify-center items-center w-full mt-2">
        <div className="w-1/2 bg-white rounded-lg p-4">
          <p>Vitals Summary</p>

          {isLoading ? (
            <div>loading..</div> ? (
              isError
            ) : (
              <div>err</div>
            )
          ) : vsData && vsData?.length > 0 ? (
            <div>
              <div
                className={`border rounded-lg p-4 ${
                  bmi > 30 && 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className='flex items-center space-x-2' >
                    <InfoIcon size={15} />
                    <p className='text-[14px] '>Body Mass Index (BMI)</p>
                  </div>
                  <div>
                    {bmi < 16 && 'Severe Malnutrition'}
                    {bmi > 16 && bmi < 18.4 && 'Mild/ Moderate Malnutrition'}
                    {bmi > 18.5 && bmi < 25 && 'Normal/ Recommended'}
                    {bmi > 25.1 && bmi < 30 && 'Overweight'}
                    {bmi > 30 && 'Obese'}
                  </div>
                </div>
                <div>
                  <p>Height </p>
                  <p>{vsData[0]?.height} cm </p>
                </div>
                <div>
                  <p>Weight </p>
                  <p>{vsData[0]?.weight} kg </p>
                </div>
                <div>
                  {/* calculate bmi kg/m2 */}
                  BMI {''} {bmi}
                </div>
              </div>

              <div>
                <p>Temperature: {vsData[0]?.temperature} C </p>
              </div>

              <p>Blood Pressure</p>
              <div>
                <p>Systolic: {vsData[0]?.systolic} C </p>
              </div>
              <div>
                <p>Diastolic: {vsData[0]?.diastolic} C </p>
              </div>

              {/*  */}
              <div>
                <p>Respiratory Rate: {vsData[0]?.respiratoryRate} C </p>
              </div>

              {/*  */}
              <div>
                <p>Oxygen Saturation {vsData[0]?.oxygenSAturation} C </p>
              </div>
            </div>
          ) : (
            <div>no data</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TriagePage
