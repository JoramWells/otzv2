/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useDeleteOTZEnrollmentMutation, useGetOTZEnrollmentQuery } from '@/api/enrollment/otzEnrollment.api'
import Avatar from '@/components/Avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { calculateAge } from '@/utils/calculateAge'
import { Loader2, Printer } from 'lucide-react'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px]" />
  }
)

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'enrollments',
    link: '/enrollments'
  }
]
const OTZPage = ({ params }: { params: any }) => {
  const { id } = params
  const { data } = useGetOTZEnrollmentQuery(id as string)
  const [deleteOTZEnrollment, { isLoading: isLoadingDelete, data: deleteData }] = useDeleteOTZEnrollmentMutation()

  const router = useRouter()
  useEffect(() => {
    if (deleteData) {
      router.back()
    }
  }, [deleteData, router])
  console.log(data)
  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="flex items-start space-x-2 w-full p-2">
        <div className="w-1/3 border border-slate-200 bg-white p-4 flex flex-col items-center space-y-2 rounded-lg">
          <div className="flex flex-col space-y-1 items-center">
            <Avatar
              name={`${data?.Patient.firstName} ${data?.Patient.middleName}`}
            />
            <p className="font-bold text-[12px]">
              {data?.Patient.firstName}
              {data?.Patient.middleName}
            </p>

            <p className="text-[12px] text-slate-500 ">
              {moment(data?.Patient.dob).format('ll')}
              {', '}
              <span>{calculateAge(data?.Patient.dob)} yrs</span>
            </p>
            <p className="text-[12px]">
              {data?.Patient.sex === 'F' ? 'Female' : 'Male'}
            </p>
          </div>
          <div className="border-b border-slate-200 w-full" />
          {/* Enrolled by */}
          <div className="w-full">
            <div className="flex justify-between text-[12px] p-1">
              <p className="font-semibold text-slate-500">Enrolled By</p>
              <p className="font-semibold">
                {data?.User.firstName} {data?.User.middleName}{' '}
              </p>
            </div>
            <div className="flex justify-between text-[12px] p-1">
              <p className="font-semibold text-slate-500">Enrollment Date</p>
              <p className="font-semibold">
                {moment(data?.dateOfEnrollmentToOTZ).format('ll')}
              </p>
            </div>
          </div>
          <div className="border-b border-slate-200 w-full" />
          <Button
            className="w-full shadow-none text-red-500 border-red-100 border hover:text-red-400 hover:bg-red-50"
            size={'sm'}
            variant={'outline'}
            disabled={isLoadingDelete}
            onClick={async () => await deleteOTZEnrollment(data?.id)}
          >
            {isLoadingDelete && <Loader2 size={16} className="animate-spin mr-2" />}
            Remove
          </Button>
        </div>
        <div className="w-1/2">
          <div className="bg-white p-2 mb-2 rounded-lg flex items-center justify-between">
            <p className="text-[16px] font-semibold text-slate-700">
              OTZ Profile
            </p>
            <Button size={'sm'} variant={'outline'} className="shadow-none">
              <Printer size={16} />
            </Button>
          </div>
          <div className="text-[12px] bg-white rounded-lg  border border-slate-200">
            <div className="bg-slate-100 p-2 rounded-t-lg">
              <p className="text-[14px] font-semibold">Current ART Profile</p>
            </div>
            <div className="p-2 flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-slate-500">Regimen</p>
                <p className="font-bold">{data?.ARTPrescription?.regimen}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-slate-500">Line</p>
                <p className="font-bold">{data?.ARTPrescription?.line}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-slate-500">Start Date</p>
                <p className="font-bold">
                  {moment(data?.ARTPrescription?.startDate).format('ll')}
                </p>
              </div>
            </div>
          </div>

          {/* VLProfile */}
          <div className="bg-white text-[12px] mt-2 rounded-lg border border-slate-200 ">
            <div className="bg-slate-100 p-2 rounded-t-lg">
              <p className="text-[14px] font-semibold">Current VL Profile</p>
            </div>
            <div className="flex flex-col space-y-2 p-2">
              <div className="flex justify-between items-center">
                <p className="text-slate-500">VL Results</p>
                <p className="font-bold">{data?.ViralLoad?.vlResults}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-slate-500">VL Justification</p>
                <p className="font-bold">{data?.ViralLoad?.vlJustification}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-slate-500">Date of VL</p>
                <p className="font-bold">
                  {moment(data?.ViralLoad?.dateOfVL).format('ll')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OTZPage
