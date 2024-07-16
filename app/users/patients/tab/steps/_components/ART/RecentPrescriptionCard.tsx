/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable multiline-ternary */
/* eslint-disable react/jsx-no-undef */
import { calculateAdherence } from '@/utils/calculateAdherence'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { type PrescriptionInterface } from 'otz-types'
interface PrescriptionCardProps {
  isLoading: boolean
  isError: boolean
  data: PrescriptionInterface
}

const RecentPrescriptionCard = ({ isLoading, isError, data }: PrescriptionCardProps) => {
  return (
    <div className="w-1/3 rounded-lg bg-white border border-slate-200">
      <div className="border border-slate-200 p-2 pl-4 bg-slate-100 border-t-0 rounded-t-lg">
        <p className="text-[14px] font-bold ">Recent Prescription</p>
      </div>
      <div>
        {isLoading ? (
          <div className="p-4 flex space-x-4 items-center">
            <Loader2 className="animate-spin mr-2" size={15} />
            Loading...
          </div>
        ) : isError ? (
          <div>error</div>
        ) : data ? (
          <div className="p-4 flex-col flex space-y-2">
            <div className="flex justify-between items-center w-full text-[14px] ">
              <p className="text-slate-500 ">Prescribed Pills</p>
              <p className="font-bold">{data.noOfPills} </p>
            </div>

            <hr />

            {/*  */}
            <div className="flex justify-between items-center w-full text-[14px] ">
              <p className="text-slate-500 ">Expected No. Of Pills</p>
              <p className="font-bold">
                {data.expectedNoOfPills}{' '}
              </p>
            </div>
            <hr />
            {/*  */}
            <div className="flex justify-between items-center w-full text-[14px] ">
              <p className="text-slate-500 ">Pills Taken</p>
              <p className="font-bold">
                {data.computedNoOfPills}{' '}
              </p>
            </div>

            <hr />
            {/*  */}
            <div className="flex justify-between items-center w-full text-[14px] ">
              <p className="text-slate-500 ">Adherence</p>
              <p className="font-bold">
                {calculateAdherence(
                  data.refillDate,
                  data.computedNoOfPills!,
                  data.frequency
                )}{' '}
                %{' '}
              </p>
            </div>
          </div>
        ) : (
          <div>No Recent prescription</div>
        )}
      </div>
    </div>
  )
}

export default RecentPrescriptionCard
