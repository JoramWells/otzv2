/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import moment from 'moment'
import { type PrescriptionInterface } from 'otz-types'

interface ArtCardProps {
  artPrescription?: PrescriptionInterface
  regimen: string
}

const ArtCard = ({ artPrescription, regimen }: ArtCardProps) => {
  return (
    <div
      className={`bg-white p-2 flex-1 justify-between ring-1 ring-slate-100 relative border-l-4 rounded
    ${
      artPrescription &&
      (artPrescription?.expectedNoOfPills as unknown as number) < 0 &&
      'bg-red-50  border-red-400'
    }
    `}
    >
      <div className="flex justify-between w-full items-center text-[14px]  ">
        <p className="text-[12px] font-semibold text-slate-800">
          Prescriptions
        </p>
        <p className=" text-slate-500 text-[12px] flex space-x-2 items-center">
          {moment(artPrescription?.refillDate).format('LL')}
        </p>
      </div>
      <div className="mt-2">
        <p className="font-bold text-slate-700 text-[14px] ">{regimen}</p>

        {artPrescription?.expectedNoOfPills
          ? <p className="text-[12px] text-red-500 font-semibold">
          {artPrescription?.expectedNoOfPills} OF {artPrescription?.noOfPills}
        </p>
          : <p
          className='text-slate-500 text-[12px]'
          >
          No pills have been prescribed yet.
        </p>
      }

      </div>
    </div>
  )
}

export default ArtCard
