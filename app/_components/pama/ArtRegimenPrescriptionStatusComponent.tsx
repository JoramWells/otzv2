/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import moment from 'moment'
import { type PrescriptionInterface } from 'otz-types'

interface ArtPrescription {
  artPrescriptionData: PrescriptionInterface | undefined
  regimen: string
}

const ArtRegimenPrescriptionStatusComponent = ({
  artPrescriptionData, regimen
}: ArtPrescription) => {
  return (
    <div className="w-full flex flex-col space-y-2">
      <p className="text-slate-500 text-[14px]">Current Regimen Status</p>

      {artPrescriptionData && (
        <div className="border-slate-200 rounded-lg border border-dotted">
          <div className="flex justify-between hover:cursor-pointer hover:bg-slate-50 rounded-lg p-1">
            <p className="text-slate-500 text-[14px] ">Current ART Regimen</p>
            <p className="font-bold text-slate-700">
              {regimen}
            </p>
          </div>
          <div className="flex justify-between hover:cursor-pointer hover:bg-slate-50 rounded-lg p-1">
            <p className="text-[14px] text-slate-500 ">Date Issued:</p>
            {moment(artPrescriptionData?.refillDate, 'YYYY-MM-DD').format('ll')}
          </div>

          <div className="flex justify-between hover:cursor-pointer hover:bg-slate-50 rounded-lg p-1">
            <p className="text-[14px] text-slate-500 ">Current Regimen Line:</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ArtRegimenPrescriptionStatusComponent
