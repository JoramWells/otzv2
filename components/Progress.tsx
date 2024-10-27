/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react'

interface ProgressInput {
  isCorrectAge: boolean
  isWillingToDisclose: boolean
  isKnowledgeable: boolean
}

const Progress = ({ data }: { data: ProgressInput }) => {
  const [percentage, setPercentage] = useState(0)
  const customRound = () => {
    return percentage - (percentage % 10)
  }
  useEffect(() => {
    if (data) {
      const booleanValues = Object?.entries(data)
        ?.filter(([key]) => key !== 'id' && key !== 'patientID' && key !== 'updatedAt' && key !== 'createdAt' && key !== 'taskOneComments' && key !== 'patientVisitID')
        ?.map(([_, value]) => value)
      const trueCount = booleanValues?.filter((item) => item === true).length
      console.log(booleanValues, 'booleanValues')
      const percentag = (trueCount / Object?.keys(booleanValues).length) * 100
      setPercentage(percentag)
    }
  }, [data])

  return (
    <div className="w-full sm:w-1/2 md:w-1/4">
      <div className="rounded-full flex flex-1 bg-slate-200">
        <div
          className="rounded-full flex pl-4 items-center h-2 bg-emerald-500 text-[12px] font-semibold"
          style={{
            width: `${customRound()}%`
          }}
        />
      </div>
      <p className="text-[10px] sm:text-[12px] font-bold text-slate-700 mt-1">
        {customRound()}%
      </p>
    </div>
  )
}

export default Progress
