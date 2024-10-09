/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable multiline-ternary */
/* eslint-disable react/jsx-no-undef */
import { calculateAdherence } from '@/utils/calculateAdherence'
import { Loader2, TriangleAlert } from 'lucide-react'
import React from 'react'
import { type PrescriptionInterface } from 'otz-types'
import RecentTestHeader from '../RecentTestHeader'
interface PrescriptionCardProps {
  isLoading: boolean
  isError: boolean
  data: PrescriptionInterface | undefined
}

const RecentPrescriptionCard = ({ isLoading, isError, data }: PrescriptionCardProps) => {
  return (
    <div className="w-1/3 rounded-lg bg-white">
      <RecentTestHeader title="Recent Prescription" date={data?.createdAt} />

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
              <p className="font-bold">{data.expectedNoOfPills} </p>
            </div>
            <hr />
            {/*  */}
            <div className="flex justify-between items-center w-full text-[14px] ">
              <p className="text-slate-500 ">Pills Taken</p>
              <p className="font-bold">{data.computedNoOfPills} </p>
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
          <div className="p-2">
            <div className="p-4 border text-red-500 items-center border-red-200 rounded-lg flex space-x-2 bg-red-50">
              <TriangleAlert className="" size={18} />
              <p
              className='text-[12px] font-semibold'
              >No Recent prescription</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentPrescriptionCard
