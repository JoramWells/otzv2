import { calculateBMI } from '@/utils/calculateBMI'
import moment from 'moment'
import { useEffect, useState } from 'react'

const BodyMassIndex = ({ createdAt, weight, height }: { createdAt: Date, weight?: number, height?: number }) => {
  const [bmi, setBMI] = useState(0)

  useEffect(() => {
    if ((weight != null) && (height != null)) {
      const BMI = calculateBMI(weight, height as unknown as string)

      setBMI(BMI)
    }
  }, [height, weight])
  return (
    <div
      className={`bg-white p-2 flex-1 justify-between relative border-l-4 rounded
    ${
     bmi > 30 &&
      'bg-red-50  border-red-400'
    }
    `}
    >
      <div className="flex justify-between w-full items-center text-[14px]  ">
        <p
          className={`text-[14px] font-semibold
                  ${bmi > 30 && 'text-red-500'}
                  `}
        >
          Body Mass Index
        </p>

        <p className="text-slate-500 text-[12px] ">
          {moment(createdAt).format('ll')}
        </p>
      </div>
      <div className="mt-2">
        <p
          className={`text-lg font-extrabold text-slate-700
                  ${bmi > 30 && 'text-red-500'}
                  `}
        >
          {bmi}
        </p>
        <p className="text-[12px] font-semibold text-slate-500">
          {weight} | {height}
        </p>
      </div>
    </div>
  )
}

export default BodyMassIndex
