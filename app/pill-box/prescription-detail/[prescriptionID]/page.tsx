/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetPrescriptionQuery } from '@/api/pillbox/prescription.api'
import { calculateAdherence } from '@/utils/calculateAdherence'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useSearchParams } from 'next/navigation'
import { useGetMmasEightByPatientIDQuery } from '@/api/treatmentplan/mmasEight.api'
import EnhancedAdherenceCounsellingForm from '../../_components/EnhancedAdherenceCounsellingForm'
import { type PrescriptionInterface } from 'otz-types'

//
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
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
    link: '/dashboard'
  },
  {
    id: '3',
    label: 'prescription',
    link: '/prescription'
  }
]

interface AdherenceProps {
  adherence: number
}

type PrescriptionAdherenceProps = PrescriptionInterface & AdherenceProps

const PrescriptionDetailPage = ({ params }: { params: any }) => {
  const { prescriptionID } = params
  const searchParams = useSearchParams()
  const patientID = searchParams.get('patientID')
  const [patientAdherence, setPatientAdherence] = useState<PrescriptionAdherenceProps>({
    frequency: 0,
    adherence: 0,
    computedNoOfPills: 0,
    noOfPills: 0,
    expectedNoOfPills: 0,
    nextRefillDate: new Date(),
    refillDate: new Date()
  })

  const { data } = useGetPrescriptionQuery(prescriptionID)

  const { data: mmas8Data } = useGetMmasEightByPatientIDQuery(patientID)

  console.log(mmas8Data, 'mmas8')
  useEffect(() => {
    if (data) {
      const { frequency, refillDate, computedNoOfPills, noOfPills, expectedNoOfPills, nextRefillDate }: PrescriptionInterface = data
      const adherence = calculateAdherence(
        refillDate,
        computedNoOfPills as unknown as number,
        frequency
      )
      setPatientAdherence({
        frequency,
        adherence,
        computedNoOfPills,
        noOfPills,
        expectedNoOfPills,
        nextRefillDate,
        refillDate
      })
    }
  }, [data])

  console.log(data)

  const [value, setValue] = useState(1)
  const {
    computedNoOfPills,
    noOfPills,
    expectedNoOfPills,
    refillDate,
    nextRefillDate,
    adherence
  } = patientAdherence
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      {/* <h1>Prescription Update</h1> */}

      {/*  */}
      {/* <div>ART details</div> */}

      <div className="flex items-start justify-between p-4 space-x-4">
        <div className="flex-1 bg-white rounded-lg">
          <div className="flex justify-between border border-slate-200 p-2 bg-slate-100">
            <h2>Prescription Details</h2>
            <Badge className="shadow-none rounded-full">Good</Badge>
          </div>
          <div className="p-4 flex flex-col space-y-2">
            <div className="flex  justify-between items-center">
              <p>Dispensed</p>
              <p>{computedNoOfPills}</p>
            </div>

            <hr />

            <div className=" flex justify-between items-center">
              <p>Prescribed No Of Pills</p>
              <p>{noOfPills}</p>
            </div>
            <hr />

            <div className=" flex justify-between items-center">
              <p>Expected No Pills</p>
              <p>{expectedNoOfPills}</p>
            </div>

            <hr />

            <div className=" flex justify-between items-center">
              <p>Refilled</p>
              <p>{moment(refillDate).format('ll')}</p>
            </div>

            <hr />

            <div className=" flex justify-between items-center">
              <p>Next Refill</p>
              <p>{moment(nextRefillDate).format('ll')}</p>
            </div>

            <hr />

            <div className=" flex justify-between items-center">
              <p>Adherence Rate</p>
              <p>{adherence} %</p>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white p-4 rounded-lg flex flex-col space-y-4">
          <div className="">
            <div className="flex border rounded-full w-1/4">
              {[
                {
                  id: 1,
                  label: 'Stats'
                },
                {
                  id: 2,
                  label: 'Insights'
                }
              ].map(({ id, label }) => (
                <Button
                  key={id}
                  onClick={() => {
                    setValue(id)
                  }}
                  className={`rounded-full flex-1  text-black bg-white ${
                    value === id && 'bg-slate-100'
                  } hover:bg-slate-50 `}
                >
                  {label}
                </Button>
              ))}
            </div>

            {/* <hr /> */}
          </div>
          {value === 1 && (
<EnhancedAdherenceCounsellingForm
score={mmas8Data?.totalScores}
adherence={patientAdherence?.adherence}
 />
          )}

          {value === 2 && <div>Graph</div>}
        </div>
      </div>
    </div>
  )
}

export default PrescriptionDetailPage
