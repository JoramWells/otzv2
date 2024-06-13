/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetPrescriptionQuery } from '@/api/pillbox/prescription.api'
import { calculateAdherence } from '@/utils/calculateAdherence'
import { useEffect, useState } from 'react'
import { type PrescriptionProps } from '../../types'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import moment from 'moment'

const PrescriptionDetailPage = ({ params }: { params: any }) => {
  const { prescriptionID } = params
  const [patientAdherence, setPatientAdherence] = useState({
    frequency: 0,
    adherence: 0,
    computedNoOfPills: 0,
    noOfPills: 0,
    expectedNoOfPills: 0,
    nextRefillDate: new Date(),
    refillDate: new Date()
  })

  const { data } = useGetPrescriptionQuery(prescriptionID)

  useEffect(() => {
    if (data) {
      const { frequency, refillDate, computedNoOfPills, noOfPills, expectedNoOfPills, nextRefillDate }: PrescriptionProps = data
      const adherence = calculateAdherence(
        refillDate,
        computedNoOfPills,
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
  return (
    <div>
      <h1>Prescription Update</h1>

      {/*  */}
      <div>ART details</div>
      <div>F{patientAdherence?.frequency}</div>

      <hr />
      <div className="flex items-start justify-between p-4 space-x-4">
        <div className="flex-1 bg-white rounded-lg">
          <div className="flex justify-between border border-slate-200 p-2 bg-slate-100">
            <h2>Prescription Details</h2>
            <Badge className="shadow-none rounded-full">Good</Badge>
          </div>
          <div className="p-4 flex flex-col space-y-2">
            <div className="flex  justify-between items-center">
              <p>Dispensed</p>
              <p>{patientAdherence?.computedNoOfPills}</p>
            </div>

            <hr />

            <div className=" flex justify-between items-center">
              <p>Prescribed No Of Pills</p>
              <p>{patientAdherence?.noOfPills}</p>
            </div>
            <hr />

            <div className=" flex justify-between items-center">
              <p>Expected No Pills</p>
              <p>{patientAdherence?.expectedNoOfPills}</p>
            </div>

            <hr />

            <div className=" flex justify-between items-center">
              <p>Refilled</p>
              <p>{moment(patientAdherence?.refillDate).format('ll')}</p>
            </div>

            <hr />

            <div className=" flex justify-between items-center">
              <p>Next Refill</p>
              <p>{moment(patientAdherence?.nextRefillDate).format('ll')}</p>
            </div>

            <hr />

            <div className=" flex justify-between items-center">
              <p>Adherence Rate</p>
              <p>{patientAdherence?.adherence} %</p>
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

                  className={`rounded-full flex-1  text-black bg-white ${value === id && 'bg-slate-100'} hover:bg-slate-50 `}
                >
                  {label}
                </Button>
              ))}
            </div>

            {/* <hr /> */}
          </div>
          {value === 1 && (
            <div className='flex flex-col space-y-2'>
              <div className="flex flex-col space-y-4 bg-slate-50 rounded-lg border border-slate-200 p-4">
                <div>
                  {' '}
                  Prescribed = Expected No. of Pills x Dispensed Pills{' '}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    {' '}
                    {patientAdherence?.noOfPills} ={' '}
                    {patientAdherence?.expectedNoOfPills} +{' '}
                    {patientAdherence?.computedNoOfPills}{' '}
                  </div>
                  <div>
                    <Badge>Not Good</Badge>
                  </div>
                </div>
              </div>
              {/* <hr /> */}
              <div className='flex flex-col space-y-2'>
                <h2>Summary</h2>
                <Textarea
                  placeholder="How is prescription Going?"
                  className="shadow-none"
                />
                {/* <small>Discuss the details of this prescription.</small> */}
              </div>
              <hr />
              <div>
                <h2>Actions</h2>
                <ol>
                  <li>Assign Case Manager</li>
                  <li>Discuss MDT</li>
                </ol>
              </div>
            </div>
          )}

          {value === 2 &&
          <div>
            Graph
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default PrescriptionDetailPage
