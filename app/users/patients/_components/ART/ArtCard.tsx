/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type PrescriptionProps } from '@/app/pill-box'
import PillBox from '../PillBox'
import { calculateAdherence } from '@/utils/calculateAdherence'
import moment from 'moment'
import { CalendarCheck2 } from 'lucide-react'

interface ArtCardProps {
  artPrescription?: PrescriptionProps
  regimen: string
}

const ArtCard = ({ artPrescription, regimen }: ArtCardProps) => {
  return (
    <div className="h-[145px] flex bg-white p-4 rounded-lg flex-1 justify-between space-x-4 items-center relative">
      <div className="">
        <h3>Prescription</h3>
        <p className="text-[14px] font-extrabold">{regimen}</p>
      </div>
      <div>
        <div className="h-[100px] border-l border-s-slate-200 " />
      </div>
      <div className="flex flex-1 justify-between space-x-4">
        <div>
          <div className="flex justify-between items-center text-[14px] w-full ">
            <p>Adherence</p>
            {calculateAdherence(
              artPrescription?.refillDate,
              artPrescription ? artPrescription.computedNoOfPills : 0,
              artPrescription ? artPrescription?.frequency : 1
            )}{' '}
            %
          </div>
          <div className="w-full items-center justify-between text-[14px] flex ">
            <p>Prescribed: </p>
            <p>{artPrescription?.noOfPills}</p>
          </div>

          {/*  */}
          <div className="w-full items-center justify-between text-[14px] flex ">
            <p>Expected No Pills: </p>
            <p>{artPrescription?.expectedNoOfPills}</p>
          </div>

          {/*  */}
          <div className="absolute bottom-2  right-2 text-slate-500 text-[12px] flex space-x-2 items-center ">
            <CalendarCheck2 className="" size={15} />
            <p>{moment(artPrescription?.refillDate).format('LL')}</p>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <PillBox
            noOfPills={artPrescription ? artPrescription?.noOfPills : 0}
            remainingPills={
              artPrescription ? artPrescription?.expectedNoOfPills : 0
            }
          />
        </div>
      </div>
    </div>
  )
}

export default ArtCard
