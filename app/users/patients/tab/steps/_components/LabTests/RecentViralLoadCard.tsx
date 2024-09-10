/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import moment from 'moment'
import RecentTestHeader from '../RecentTestHeader'

interface RecentViralLoadCardProps {
  data: ViralLoadInterface
  average: string
}

const RecentViralLoadCard = ({ data, average }: RecentViralLoadCardProps) => {
  return (
    <div className="w-1/3 bg-white rounded-lg">
      <RecentTestHeader title="Recent Test" date={data?.createdAt} />
      <div className="p-4 flex flex-col space-y-2">
        <div className="flex justify-between items-center w-full text-[14px] ">
          <p className="text-slate-500 ">Results</p>
          <p className="font-bold">
            {data?.vlResults} <span className="text-[12px]">Copies/ml</span>
          </p>
        </div>
        <hr />

        <div className="flex justify-between items-center w-full text-[14px] ">
          <p className="text-slate-500 ">Justification</p>
          <p className="font-bold">{data?.vlJustification}</p>
        </div>
        <hr />

        <div className="flex justify-between items-center w-full text-[14px] ">
          <p className="text-slate-500 ">Date</p>
          <p className="font-bold">{moment(data?.dateOfVL).format('ll')}</p>
        </div>
      </div>
{/*
      {parseFloat(average) > 0 && (
        <div className="pl-4 pr-4 pb-4">
          {parseFloat(average) <= 0
            ? (
            <div>This patient has less than 3 viral load tests</div>
              ? (
                  parseFloat(average) >= 200 && parseFloat(average) <= 999
                )
              : (
              <div>Persistent LLV </div>
                )
              )
            : (
            <div className="p-2 text-[14px] border rounded-lg  border-orange-200 bg-orange-50 capitalize text-orange-500 ">
              Average viral load for 3 tests{' '}
              <span className="font-bold">{average}</span>{' '}
            </div>
              )}
        </div>
      )} */}
    </div>
  )
}

export default RecentViralLoadCard
