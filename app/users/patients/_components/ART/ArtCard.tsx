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
      className={`bg-white p-2 flex-1 justify-between relative border-l-4 rounded
    ${
      artPrescription &&
      artPrescription?.expectedNoOfPills as unknown as number < 0 &&
      'bg-red-50  border-red-400'
    }
    `}
    >
      <div className="flex flex-row justify-between">
        <p className="text-[14px] font-semibold">Prescriptions</p>
        <div className=" text-slate-500 text-[12px] flex space-x-2 items-center">
          <p>{moment(artPrescription?.refillDate).format('LL')}</p>
        </div>
      </div>
      <div className='mt-2'>
        <p className="text-lg font-extrabold text-slate-700">{regimen}</p>

        <p className="text-[12px] text-red-500 font-semibold">
          {artPrescription?.expectedNoOfPills} OF {artPrescription?.noOfPills}
        </p>
      </div>
    </div>
  )
}

export default ArtCard
