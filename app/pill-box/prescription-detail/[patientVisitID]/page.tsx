/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetPrescriptionQuery, useUpdatePrescriptionMutation } from '@/api/pillbox/prescription.api'
import { calculateAdherence } from '@/utils/calculateAdherence'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
import CustomInput from '@/components/forms/CustomInput'

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

  const { data: mmas8Data } = useGetMmasEightByPatientIDQuery(patientID as string)

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

  // const [value, setValue] = useState(1)
  const {
    id,
    computedNoOfPills,
    noOfPills,
    expectedNoOfPills: exNofPills,
    frequency,
    Patient,
    ARTPrescription
  } = patientAdherence

  const [updatePrescription, { isLoading }] = useUpdatePrescriptionMutation()
  const [refillDate, setRefillDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  )
  const [expectedNoOfPill, setExpectedNoOfPills] = useState<number>(0)

  const [nextRefillDate, setNextRefillDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  )

  //
  const [noOfPill, setNoOfPills] = useState<number>(0)
  const [frequencyInput, setFrequencyInput] = useState(frequency)

  const duration = noOfPill / frequencyInput

  const addDaysFunc = useCallback((date: Date) => {
    const currentDate = moment(date)
    return currentDate.add(duration, 'days')
  }, [duration])

  const calculateExpectedNoOfPills = useCallback(() => {
    const duration = moment(refillDate).diff(moment(), 'days')
    const usedPills = duration * frequencyInput
    return noOfPill - usedPills
  }, [frequencyInput, noOfPill, refillDate])

  console.log(calculateExpectedNoOfPills(), 'currentDateAddDaysFunc')

  useEffect(() => {
    // calculate next refill date

    setFrequencyInput(`${patientAdherence.frequency}` as unknown as number)
    setNoOfPills(patientAdherence.noOfPills)
    setExpectedNoOfPills(patientAdherence.expectedNoOfPills as number)
    setRefillDate(
      new Date(patientAdherence.refillDate).toISOString().split('T')[0]
    )
    setNextRefillDate(addDaysFunc(patientAdherence.refillDate).format('YYYY-MM-DD'))
  }, [addDaysFunc, exNofPills, frequency, noOfPills, patientAdherence.expectedNoOfPills, patientAdherence.frequency, patientAdherence.nextRefillDate, patientAdherence.noOfPills, patientAdherence.refillDate])

  const [tabValue, setTabValue] = useState('prescription')

  //
  const inputValues = useMemo(() => [
    {
      id,
      frequency: frequencyInput,
      noOfPills,
      expectedNoOfPills: calculateExpectedNoOfPills(),
      nextRefillDate: addDaysFunc(refillDate as unknown as Date).format('YYYY-MM-DD'),
      refillDate
    }
  ], [addDaysFunc, calculateExpectedNoOfPills, frequencyInput, id, noOfPills, refillDate])[0]

  //

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
                    <div
                    className='flex flex-col space-y-4'
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
                      <CustomInput
                        label="Refill Date"
                        type="date"
                        onChange={setRefillDate}
                        value={refillDate}
                      />

                                    <CustomInput
                        label="Number of Pills"
                        type="number"
                        onChange={setNoOfPills}
                        value={noOfPill}
                      />

                      <CustomInput
                        label="Expected Number of Pills"
                        type="number"
                        onChange={setExpectedNoOfPills}
                        value={expectedNoOfPill}
                      />

                      <Button
                        className="mt-2"
                        size={'sm'}
                        disabled={isLoading}
                        onClick={async () =>
                          await updatePrescription(inputValues)
                        }
                      >
                        {isLoading && (
                          <Loader2 className="animate-spin mr-2" size={18} />
                        )}
                        Save
                      </Button>
                    </div>
                  )}

                  {tabValue === 'time and work' && (
                    <>
                      <UpdateTimeAndWork
                        frequency={frequency as unknown as number}
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
                computedNoOfPills !== expectedNoOfPill &&
                'bg-red-50 text-red-500'
              } `}
            >
              <div className="flex items-center space-x-2">
                {computedNoOfPills !== expectedNoOfPill && (
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
                expectedNoOfPill &&
                expectedNoOfPill < 0 &&
                'bg-red-50 font-bold text-red-500'
              } `}
            >
              <p>Expected No Pills</p>
              <p>{expectedNoOfPill}</p>
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
              <p>
                {computedNoOfPills &&
                  expectedNoOfPill &&
                  Math.floor(
                    (computedNoOfPills / (noOfPills - expectedNoOfPill)) * 100
                  )}
                %
              </p>
            </div>
          </div>
        </div>

        <EnhancedAdherenceCounsellingForm
          score={mmas8Data?.totalScores as unknown as string}
          adherence={patientAdherence?.adherence as unknown as number}
          prescriptionID={prescriptionID}
          nextAppointmentDate={nextRefillDate as unknown as Date}
        />
      </div>
    </div>
  )
}

export default PrescriptionDetailPage
