'use client'

import { useGetAllVitalSignDetailQuery } from '@/api/vitalsigns/vitalSigns.api'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
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
  }
]

const TriagePage = () => {
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('visitID')
  const { data: vsData } = useGetAllVitalSignDetailQuery(appointmentID)
  console.log(vsData, 'lop')

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="flex justify-center items-center w-full">
        <div className="w-1/2 bg-white rounded-lg p-4">
          <p>Vitals Summary</p>

          {vsData?.map((item: any) => (
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
    </div>
  )
}

export default TriagePage
