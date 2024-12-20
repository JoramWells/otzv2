import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React from 'react'

interface CurrentCOnfigInputProps {
  homeVisitReasonDescription?: string
  frequency?: string
  dateRequested?: Date | string
  id?: string
  patientID: string
  isConfig?: boolean
}

const CurrentConfig = ({ homeVisitReasonDescription, frequency, dateRequested, id, patientID, isConfig = false }: CurrentCOnfigInputProps) => {
  const router = useRouter()
  return (
    <div className="w-1/3 bg-white rounded-lg border border-slate-200">
      <div className="border-b p-2 rounded-t-lg flex items-center space-x-2 bg-slate-50 ">
        <Settings size={14} className="text-slate-500" />
        <h3 className="font-semibold text-slate-700 text-[14px] ">Configuration</h3>
      </div>

      {/*  */}
      <div className="p-2 pt-0 pb-0 ">
        <div className="flex justify-between p-2 text-[12px]">
          <h3 className="text-slate-500">Reason</h3>
          <p className="font-semibold">{homeVisitReasonDescription}</p>
        </div>

        {/*  */}
        <hr />

        <div className="flex justify-between p-2 text-[12px] ">
          <h3 className="text-slate-500">Frequency</h3>
          <p className="font-semibold">{frequency}</p>
        </div>
        <hr />

        <div className="flex justify-between p-2 text-[12px] ">
          <h3 className="text-slate-500">Date Requested</h3>
          <h4 className="font-semibold">
            {moment(dateRequested).format('ll')}
          </h4>
        </div>
      </div>

      {/*  */}
      {isConfig && (
        <div className='border-t p-2' >
          <Button
            className="text-cyan-500"
            variant={'link'}
            onClick={() => {
              router.push(
                `/home-visit/add-home-visit/${id}?patientID=${patientID}`
              )
            }}
            size={'sm'}
          >
            Use this configuration
          </Button>
        </div>
      )}
    </div>
  )
}

export default CurrentConfig
