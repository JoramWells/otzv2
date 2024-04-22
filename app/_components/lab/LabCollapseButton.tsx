/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import { useDeleteInternalLabRequestMutation } from '@/api/viraload/internalLabRequest.api'
import { Badge } from '@/components/ui/badge'
import { Loader2, Trash2 } from 'lucide-react'

interface DataProps {
  data: []
}

const LabCollapseButton = ({ data }: DataProps) => {
  const [deleteInternalLabRequest, { isLoading }] = useDeleteInternalLabRequestMutation()
  console.log(data, 'dtz')
  return (
    <div className="flex flex-col space-y-4">
      {data?.map((item: any, idx) => (
        <div
          key={item.id}
          className=" w-full flex items-center justify-between border border-slate-200
        rounded-lg p-4
        "
        >
          <div className="flex flex-row w-full items-center space-x-4 pr-4">
            <div className="w-full">
              <div className="flex space-x-2 items-center">
                <p className="font-bold  text-slate-700">{item.testName}</p>
                {item?.results
                  ? (
                  <Badge className="rounded-full shadow-none
                  bg-teal-50 text-teal-600
                  ">Completed</Badge>
                    )
                  : (
                  <Badge className="rounded-full shadow-none
                  bg-red-50 text-red-500
                  ">
                    Not Completed
                  </Badge>
                    )}
              </div>
              <div
                className="flex flex-row justify-between items-center
                pt-2 pb-2
                "
              >
                <p
                  className="text-slate-500
                  text-sm
                  "
                >
                  Specimen Type:
                </p>
                <p
                  className="text-slate-500
                  text-sm
                  "
                >
                  {item.specimenType}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-slate-500 text-sm">Reason:</p>
                <p
                  className="text-slate-500
                  text-sm
                  "
                >
                  {item.reason}
                </p>
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
        </div>
      ))}
    </div>
  )
}

export default LabCollapseButton
