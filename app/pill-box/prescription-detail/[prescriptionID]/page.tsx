/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetPrescriptionQuery, useUpdatePrescriptionMutation } from '@/api/pillbox/prescription.api'
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
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import { Loader2, Pencil } from 'lucide-react'
import CustomSelect from '@/components/forms/CustomSelect'

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
    id: '',
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
      const { id, frequency, refillDate, computedNoOfPills, noOfPills, expectedNoOfPills, nextRefillDate }: PrescriptionInterface = data
      const adherence = calculateAdherence(
        refillDate,
        computedNoOfPills as unknown as number,
        frequency
      )
      setPatientAdherence({
        id,
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
    id,
    computedNoOfPills,
    noOfPills,
    expectedNoOfPills,
    refillDate,
    nextRefillDate,
    adherence,
    frequency
  } = patientAdherence

  const [updatePrescription, { isLoading }] = useUpdatePrescriptionMutation()

  const [frequencyInput, setFrequencyInput] = useState()
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      {/* <h1>Prescription Update</h1> */}

      {/*  */}
      {/* <div>ART details</div> */}

      <div className="flex items-start justify-between p-4 space-x-4">
        <div className="flex-1 bg-white rounded-lg">
          <div className="flex justify-between items-center border rounded-t-lg border-slate-200 p-2 bg-slate-100">
            <h5>Prescription Details</h5>
            <div className="flex flex-row items-center space-x-1">
              <Badge className="shadow-none rounded-full">Good</Badge>
              <CaseManagerDialog label={<Pencil size={14} />}>
                <div
                className='p-4'
                >
                  <CustomSelect
                    label="Frequency"
                    value={frequencyInput as unknown as string}
                    onChange={setFrequencyInput}
                    data={[
                      {
                        id: '1',
                        label: 'OD'
                      },
                      {
                        id: '2',
                        label: 'BD'
                      }
                    ]}
                  />

                  <Button className='mt-2'
                  size={'sm'}
                  onClick={async () => await updatePrescription({
                    id,
                    frequency: frequencyInput
                  })}
                  >
                    {isLoading && <Loader2 className='animate-spin mr-2' size={18}/>}
                    Save
                  </Button>
                </div>
              </CaseManagerDialog>
            </div>
          </div>
          <div className="p-2 flex flex-col">
            <div className="flex  justify-between items-center text-[14px] p-2 ">
              <p>Dispensed</p>
              <p>{computedNoOfPills}</p>
            </div>

            <hr />

            <div className="flex  justify-between items-center text-[14px] p-2 ">
              <p>Frequency</p>
              <p>{frequency}</p>
            </div>

            <hr />

            <div className=" flex justify-between text-[14px] items-center p-2">
              <p>Prescribed No Of Pills</p>
              <p>{noOfPills}</p>
            </div>
            <hr />

            <div
              className={` flex justify-between items-center text-[14px] p-2 rounded ${
                expectedNoOfPills && expectedNoOfPills < 0 && 'bg-red-50 font-bold text-red-500'
              } `}
            >
              <p>Expected No Pills</p>
              <p>{expectedNoOfPills}</p>
            </div>

            <hr />

            <div className=" flex justify-between items-center text-[14px] p-2 ">
              <p>Refilled</p>
              <p>{moment(refillDate).format('ll')}</p>
            </div>

            <hr />

            <div className=" flex justify-between items-center text-[14px] p-2 ">
              <p>Next Refill</p>
              <p>{moment(nextRefillDate).format('ll')}</p>
            </div>

            <hr />

            <div className=" flex justify-between items-center text-[14px] p-2 ">
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
