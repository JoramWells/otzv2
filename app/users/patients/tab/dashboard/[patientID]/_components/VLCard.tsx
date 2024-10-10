import moment from 'moment'
import React from 'react'

const VLCard = ({ dateOfVL, vlResults }: { dateOfVL: Date, vlResults: number }) => {
  return (
    <div className="rounded p-2 flex-1 items-center bg-white relative border-l-4 border-slate-200 ">
      <div className="flex justify-between w-full items-center text-[14px]  ">
        <p className="font-semibold text-[14px]">Viral Load</p>

        <p
        className='text-slate-500 text-[12px] '
        > {moment(dateOfVL).format('ll')} </p>
      </div>
      <div className='mt-2'>
        <p className="text-lg font-extrabold text-slate-700 ">{vlResults}</p>
        <p className="text-[12px] font-semibold text-slate-500">Copies/ml</p>
      </div>
      {/* <div className="w-full flex justify-end items-center absolute top-2 right-2 ">
                {data.isVLValid ? (
                  <Badge className="rounded-full shadow-none hover:bg-emerald-50  bg-emerald-50 text-emerald-500">
                    Valid
                  </Badge>
                ) : (
                  <Badge className="rounded-full shadow-none hover:bg-red-50  bg-red-50 text-red-500">
                    Invalid
                  </Badge>
                )}
              </div> */}
    </div>
  )
}

export default VLCard