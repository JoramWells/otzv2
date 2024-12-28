/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetViralLoadTestQuery } from '@/api/lab/viralLoadTests.api'
// import { useGetPatientQuery } from '@/api/patient/patients.api'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const ViralLoadPage = ({ params }: any) => {
  const patientID = params.patientID
  const [dateOfVL, setDateOfVL] = useState('')
  const [vlResults, setVLResults] = useState('')
  const [vlJustification, setVLJustification] = useState('')
  const { data } = useGetViralLoadTestQuery(patientID)
  //   const { data: patientData } = useGetPatientQuery(patientID)
  console.log(data)
  return (
    <div className="p-4 mt-14 flex flex-col items-center justify-center">
      <p>ViralLoadPage</p>
      {data ? (
        <div>
          <p>This is a new Patient According to registration Details</p>
          <p>This is the first VL Update</p>
        </div>
      ) : (
        <div
          className="border border-slate-200 rounded-lg p-4 w-1/2
        flex flex-col space-y-6

        "
        >
          <div>
            <p>This is a new Patient According to registration Details</p>
            <p>This is the first VL Update</p>
          </div>
          {/*
          <CustomInput label="Date of VL" type="date" />

          <CustomInput label="VL Results(Copies/ml)" />

          <CustomSelect label="VL Justification" /> */}
          <div className="flex justify-end">
            <Button
              className="shadow-none bg-teal-600 flex-grow-0
          flex-shrink-0 hover:bg-teal-700 font-bold
          "
            >
              Save
            </Button>
          </div>
        </div>
      )}

      <ol>
        <li>VL Results</li>
        <li>VL Validity</li>
        <li>VL Justification</li>
        <li>Date of Current VL</li>
        <li>Date of Next VL</li>
      </ol>
    </div>
  )
}

export default ViralLoadPage
