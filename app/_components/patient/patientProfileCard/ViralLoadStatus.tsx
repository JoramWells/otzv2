/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useGetViralLoadTestQuery } from '@/api/enrollment/viralLoadTests.api'
import { Skeleton } from '@/components/ui/skeleton'
import { Tag } from '@chakra-ui/react'
import { AlertTriangle } from 'lucide-react'
import moment, { type MomentInput } from 'moment'
import Link from 'next/link'
import { Suspense } from 'react'
// import {} from 'lucide-react'

interface DataProps {
  patientID: string
}

interface ViralLoadContainerProps {
  vlResults: string
  dateOfCurrentVL: MomentInput
  dateOfNextVL: MomentInput
}

const ViralLoadContainer = ({ vlResults, dateOfCurrentVL, dateOfNextVL }: ViralLoadContainerProps) => {
  return (
     <>
        <div className="flex flex-row items-center justify-between">
          <p className="text-sm font-bold text-slate-500">Results</p>{' '}
          <Tag variant={'outline'} rounded={'full'} size={'sm'}>
            {vlResults}
          </Tag>
        </div>

        {/*  */}
        <div className="flex flex-row items-center justify-between">
          <p className="text-sm font-bold text-slate-500">Date Taken</p>{' '}
          <p className="text-sm">
            {moment(dateOfCurrentVL).format('ll')}
          </p>
        </div>

        {/*  */}
        <div className="flex flex-row items-center justify-between">
          <p className="text-sm font-bold text-slate-500">Next VL Test</p>{' '}
          <p className="text-sm">{moment(dateOfNextVL).format('ll')}</p>
        </div>
</>
  )
}

export const ViralLoadStatus = ({ patientID }: DataProps) => {
  const { data: vlData, isLoading, isError } = useGetViralLoadTestQuery(patientID)

  return (
    <Suspense fallback={<Skeleton className="h-[200px]" />}>
      <div
        className="mt-4 flex flex-col space-y-2"
      >
        <div
        className='flex justify-between items-center'
        >
          <h1 className="font-extrabold text-lg">VL Status</h1>
          <AlertTriangle
          className='text-red-500 hover:cursor-pointer'
          size={18}
          />
        </div>
        {isLoading
          ? (
          <div>Loading</div>
            )
          : isError
            ? (
          <div>Error..</div>
              )
            : (
          <>
            {vlData
              ? (
              <ViralLoadContainer
                vlResults={vlData?.vlResults}
                dateOfCurrentVL={vlData?.dateOfCurrentVL}
                dateOfNextVL={vlData?.dateOfNextVL}
              />
                )
              : (
              <Link
                href={`/patients/viralload/${patientID}`}
                className="text-blue-500  underline italic text-sm"
              >
                Update Patients VL Status
              </Link>
                )}
          </>
              )}
      </div>
    </Suspense>
  )
}
