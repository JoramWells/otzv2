/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import { useDeleteInternalLabRequestMutation } from '@/api/viraload/internalLabRequest.api'
import { CustomCollapseButton } from '../dashboard/CustomCollapseButton'
import { Loader2, Trash2 } from 'lucide-react'

interface DataProps {
  data: []
  patientID: string
}

const LabCollapseButton = ({ data, patientID }: DataProps) => {
  const [deleteInternalLabRequest, { isLoading }] = useDeleteInternalLabRequestMutation(patientID)

  return (
    <div className="flex flex-col space-y-4 w-3/4">
      {data?.map((item: any, idx) => (
        <div key={item.id} className=" w-full flex items-center border-l-4 border-slate-500 rounded-sm">

          <CustomCollapseButton label={item.testName}>
            <div className="flex flex-row items-center space-x-4 pr-4">
              <div className="w-full">
                <div
                  className="flex flex-row justify-between items-center
                pt-2 pb-2
                "
                >
                  <p className="text-slate-500">Specimen Type:</p>
                  <p className="text-slate-500">{item.specimenType}</p>
                </div>

                <div className="flex justify-between">
                  <p>Reason:</p>
                  <p className="text-slate-500">{item.reason}</p>
                </div>
              </div>
              <div className="border-l border-slate-200 h-14" />
              {isLoading
                ? (
                <Loader2
                  className="bg-slate-50 rounded-lg p-1 animate-spin
                    hover:cursor-pointer  h-7 w-7 text-slate-500
                    "
                />
                  )
                : (
                <Trash2
                  className="bg-slate-50 rounded-lg p-1
                    hover:cursor-pointer  h-7 w-7 text-slate-500
                    "
                  onClick={() => deleteInternalLabRequest(item.id)}
                />
                  )}
            </div>
          </CustomCollapseButton>
        </div>
      ))}
    </div>
  )
}

export default LabCollapseButton
