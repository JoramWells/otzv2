import { Button } from '@/components/ui/button'
import { ArrowRight, Settings } from 'lucide-react'
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
    <div className="w-1/4 bg-white rounded-lg">
      <div className="bg-slate-200 p-3 rounded-t-lg flex items-center space-x-2 ">
        <Settings size={20} className='text-slate-500' />
        <h3
        className='font-semibold text-slate-700 '
        >Config</h3>
      </div>

      {/*  */}
      <div className="p-2">
        <div className="flex justify-between p-2">
          <h3>Reason</h3>
          {homeVisitReasonDescription}
        </div>

        {/*  */}
        <hr />

        <div className="flex justify-between p-2">
          <h3>Frequency</h3>
          <p>{frequency}</p>
        </div>
        <hr />

        <div className="flex justify-between p-2">
          <h3>Date Requested</h3>
          <h4>{moment(dateRequested).format('ll')}</h4>
        </div>
      </div>

      {/*  */}
      {isConfig && (
        <Button
          className="space-x-4 justify-between flex text-blue-500 border-none"
          variant={'outline'}
          onClick={() => {
            router.push(
              `/home-visit/add-home-visit/${id}?patientID=${patientID}`
            )
          }}
        >
          Use This Config
          <ArrowRight size={18} />
        </Button>
      )}
    </div>
  )
}

export default CurrentConfig
