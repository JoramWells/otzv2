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
import { Loader2, Pencil, TriangleAlert } from 'lucide-react'
import CustomSelect from '@/components/forms/CustomSelect'
import { calculateTimeDuration } from '@/utils/calculateTimeDuration'
import Avatar from '@/components/Avatar'
import CustomTab from '@/components/tab/CustomTab'
import UpdateTimeAndWork from '../../_components/UpdateTimeAndWork'

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
  adherence?: number
  Patient?: {
    firstName: string
    middleName: string
  }
  ARTPrescription?: {
    regimen: string
  }
}

type PrescriptionAdherenceProps = PrescriptionInterface & AdherenceProps

const PrescriptionDetailPage = ({ params }: { params: any }) => {
  const { patientVisitID } = params
  const searchParams = useSearchParams()
  const patientID = searchParams.get('patientID')
  const prescriptionID = searchParams.get('prescriptionID')
  const [patientAdherence, setPatientAdherence] =
    useState<PrescriptionAdherenceProps>({
      id: '',
      frequency: 0,
      adherence: 0,
      computedNoOfPills: 0,
      noOfPills: 0,
      expectedNoOfPills: 0,
      nextRefillDate: new Date(),
      refillDate: new Date(),
      Patient: {
        firstName: '',
        middleName: ''
      },
      ARTPrescription: {
        regimen: ''
      }
    })

  const { data } = useGetPrescriptionQuery(patientVisitID as string)

  const { data: mmas8Data } = useGetMmasEightByPatientIDQuery(patientID)

  console.log(data, 'mmas8')
  useEffect(() => {
    if (data) {
      const { id, frequency, refillDate, computedNoOfPills, noOfPills, expectedNoOfPills, nextRefillDate, Patient, ARTPrescription }: PrescriptionAdherenceProps = data
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
        refillDate,
        Patient,
        ARTPrescription

      })
    }
  }, [data])

  console.log(data)

  // const [value, setValue] = useState(1)
  const {
    id,
    computedNoOfPills,
    noOfPills,
    expectedNoOfPills,
    refillDate,
    nextRefillDate,
    adherence,
    frequency,
    Patient,
    ARTPrescription
  } = patientAdherence

  const [updatePrescription, { isLoading }] = useUpdatePrescriptionMutation()

  const [frequencyInput, setFrequencyInput] = useState()
  const [tabValue, setTabValue] = useState('prescription')
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      {/* <h1>Prescription Update</h1> */}

      {/*  */}
      {/* <div>ART details</div> */}

      <div className="mt-2 bg-white p-2">
        <div className="flex items-center space-x-2">
          <Avatar name={`${Patient?.firstName} ${Patient?.middleName}`} />
          <p className="text-slate-700 text-[14px] font-semibold capitalize">
            {Patient?.firstName} {Patient?.middleName}
          </p>
        </div>
      </div>

      <div className="flex items-start justify-between p-2 space-x-2">
        <div className="flex-1 bg-white rounded-lg">
          <div className="flex justify-between items-center border rounded-t-lg border-slate-200 p-1 pl-2 pr-2 bg-slate-100">
            <h5 className="font-semibold text-[14px]">Prescription Details</h5>
            <div className="flex flex-row items-center space-x-1">
              <Badge className="shadow-none rounded-full">Good</Badge>
              <CaseManagerDialog label={<Pencil size={14} />}>
                <div className="p-4 overflow-y-auto">
                  <CustomTab
                    setValue={setTabValue}
                    value={tabValue}
                    categoryList={[
                      {
                        id: 1,
                        label: 'Prescription'
                      },
                      {
                        id: 2,
                        label: 'Time And Work'
                      }
                    ]}
                  />
                  {tabValue === 'prescription' && (
                    <>
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

                      <Button
                        className="mt-2"
                        size={'sm'}
                        onClick={async () =>
                          await updatePrescription({
                            id,
                            frequency: frequencyInput
                          })
                        }
                      >
                        {isLoading && (
                          <Loader2 className="animate-spin mr-2" size={18} />
                        )}
                        Save
                      </Button>
                    </>
                  )}

                  {tabValue === 'time and work' && (
                    <>
                      <UpdateTimeAndWork
                        frequency={frequencyInput as unknown as number}
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        patientID={patientID!}
                      />
                    </>
                  )}
                </div>
              </CaseManagerDialog>
            </div>
          </div>
          <div className="p-2 flex flex-col">
            <div className="flex  justify-between items-center text-[14px] p-2 ">
              <p>Dispensed</p>
              <p className="font-bold text-slate-700">
                {ARTPrescription?.regimen}
              </p>
            </div>

            <hr />

            <div
              className={`flex  justify-between items-center text-[14px] p-2 rounded-lg ${
                computedNoOfPills !== expectedNoOfPills &&
                'bg-red-50 text-red-500'
              } `}
            >
              <div className="flex items-center space-x-2">
                {computedNoOfPills !== expectedNoOfPills && (
                  <TriangleAlert size={14} />
                )}
                Taken
              </div>
              <p className="font-bold">
                {computedNoOfPills} OF {noOfPills}
              </p>
            </div>

            <hr />

            <div className="flex  justify-between items-center text-[14px] p-2 ">
              <p>Frequency</p>
              <div
                className="bg-slate-50 border border-slate-200 rounded-full h-6 w-6 flex items-center font-semibold justify-center text-slate-500 text-[12px] shadow-none
              "
              >
                {frequency}
              </div>
            </div>

            <hr />

            <div
              className={` flex justify-between items-center text-[14px] p-2 rounded ${
                expectedNoOfPills &&
                expectedNoOfPills < 0 &&
                'bg-red-50 font-bold text-red-500'
              } `}
            >
              <p>Expected No Pills</p>
              <p>{expectedNoOfPills}</p>
            </div>

            <hr />

            <div className=" flex justify-between items-center text-[14px] p-2 ">
              <p>Refilled</p>
              <div className="flex flex-row">
                <p>{moment(refillDate).format('ll')}, </p>
                <p className="text-slate-500">
                  {' '}
                  {calculateTimeDuration(refillDate)}
                </p>
              </div>
            </div>

            <hr />

            <div className=" flex justify-between items-center text-[14px] p-2 ">
              <p>Next Refill</p>
              <div className="flex flex-row">
                <p>{moment(nextRefillDate).format('ll')}, </p>
                <span className="text-slate-500">
                  {calculateTimeDuration(nextRefillDate)}
                </span>
              </div>
            </div>

            <hr />

            <div className=" flex justify-between items-center text-[14px] p-2 ">
              <p>Adherence Rate</p>
              <p>{adherence} %</p>
            </div>
          </div>
        </div>

        <EnhancedAdherenceCounsellingForm
          score={mmas8Data?.totalScores}
          adherence={patientAdherence?.adherence as unknown as number}
          prescriptionID={prescriptionID}
          nextAppointmentDate={nextRefillDate}
        />
      </div>
    </div>
  )
}

export default PrescriptionDetailPage
