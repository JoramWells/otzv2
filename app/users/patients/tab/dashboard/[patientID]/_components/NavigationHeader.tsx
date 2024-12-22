import { PatientProfileDropdown } from '@/app/users/patients/_components/PatientProfileDropdown'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeftRight, Loader2, Plus, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const NavigationHeader = ({
  id,
  cccNo,
  dob,
  firstName,
  middleName,
  phoneNo,
  isFetchingPatient,
  isSavingVisit,
  isErrorFetchingPatient,
  handleClick,
  link,
  noOfVisits
}: {
  id?: string
  cccNo?: string
  dob?: string | Date
  firstName?: string
  middleName?: string
  phoneNo?: string
  isFetchingPatient: boolean
  isErrorFetchingPatient: boolean
  isSavingVisit: boolean
  handleClick: (link: string) => Promise<void>
  link: string
  noOfVisits?: number
}) => {
  const router = useRouter()
  return (
    <div className="flex flex-row space-x-2 justify-between mt-1 p-1 pl-4 pr-4 bg-white ">
      {isFetchingPatient
        ? (
        <Skeleton className="w-[100px] h-8" />
          )
        : isErrorFetchingPatient
          ? (
        <div>error...</div>
            )
          : (
        <PatientProfileDropdown
          id={id}
          cccNo={cccNo}
          dob={dob}
          firstName={firstName}
          middleName={middleName}
          phoneNo={phoneNo}
        />
            )}
      <div className="flex flex-row items-center space-x-2">
        <Button
        size={'sm'}
        className='shadow-none'
        variant={'outline'}
        onClick={() => router.push(`/users/patients/tab/transfer/${id}`)}
        >
          <ArrowLeftRight size={14} className='mr-2' />
          Transfer
        </Button>
        <p className='text-[12px] font-extrabold text-slate-500' >
            {noOfVisits ?? 0} visits
        </p>
        <Button
          className="text-slate-500 flex flex-row space-x-1 shadow-none"
          variant={'outline'}
          size={'sm'}
        >
          <Star size={16} className="mr-1" />
          Star
        </Button>
        <Button
          disabled={isSavingVisit}
          onClick={async () => {
            await handleClick(link)
          }}
          className="shadow-none flex items-center justify-center text-white bg-teal-500 hover:bg-teal-600"
          // variant={'outline'}
          size={'sm'}
        >
          {isSavingVisit
            ? (
            <Loader2 className="mr-1 animate-spin" size={16} />
              )
            : (
            <Plus size={16} className="mr-1" />
              )}
          <>
            New Visit
            {/* <ArrowRight size={16} className="ml-2" /> */}
          </>
        </Button>
      </div>
    </div>
  )
}

export default NavigationHeader
