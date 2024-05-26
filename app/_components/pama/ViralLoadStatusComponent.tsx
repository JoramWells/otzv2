/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Badge } from '@/components/ui/badge'
import moment from 'moment'
import { type VLDataProps } from './PrimaryCaregiver'

interface ViralLoad {
  viralLoadData: VLDataProps | null
}

const ViralLoadStatusComponent = ({ viralLoadData }: ViralLoad) => {
  return (
    <div className="rounded-lg  w-full flex flex-col space-y-2">
      <p className="text-[14px] text-slate-500 ">Current Viral Load Status</p>

      {viralLoadData && (
        <div
          className="border-slate-200 border rounded-lg border-dotted h-[100px]
          "
        >
          <div className="flex justify-between hover:cursor-pointer hover:bg-slate-50 rounded-lg p-1">
            <p className="text-slate-500 text-[14px] ">VL Results: </p>
            <p className="font-semibold text-slate-700 ">
              {viralLoadData?.vlResults}
            </p>
          </div>
          <div className="flex justify-between hover:cursor-pointer hover:bg-slate-50 rounded-lg p-1">
            <p className="text-slate-500 text-[14px] ">VL Date:</p>
            <p className="font-semibold text-slate-700">
              {moment(viralLoadData?.dateOfVL, 'YYYY-MM-DD').format('ll')}{' '}
            </p>
          </div>
          <div className="flex justify-between hover:cursor-pointer hover:bg-slate-50 rounded-lg p-1">
            <p className="text-[14px] text-slate-500">Is VL Valid:</p>
            <p>
              {viralLoadData?.isVLValid
                ? (
                <Badge className="rounded-full shadow-none bg-emerald-50 text-emerald-500">
                  Valid
                </Badge>
                  )
                : (
                <Badge className="shadow-none rounded-full bg-red-50 text-rose-500 hover:bg-red-50">
                  Invalid
                </Badge>
                  )}{' '}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViralLoadStatusComponent
