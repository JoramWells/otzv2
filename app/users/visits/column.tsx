/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
import { type ExtendedPatientVisitsInterface } from '@/api/patient/patientVisits.api'
import { useGetExecuteDisclosureByVisitIdQuery } from '@/api/treatmentplan/full/executeDisclosure.api'
import { useGetPostDisclosureByVisitIdQuery } from '@/api/treatmentplan/full/postDisclosure.api'
import { useGetMmasEightByVisitIDQuery } from '@/api/treatmentplan/mmasEight.api'
import { useGetMmasFourByVisitIDQuery } from '@/api/treatmentplan/mmasFour.api'
import { useGetChildCaregiverReadinessByVisitIdQuery } from '@/api/treatmentplan/partial/childCaregiverReadiness.api'
import { useGetDisclosureEligibilityByVisitIDQuery } from '@/api/treatmentplan/partial/disclosureEligibility.api'
import { useGetTimeAndWorkByVisitIDQuery } from '@/api/treatmentplan/timeAndWork.api'
import Avatar from '@/components/Avatar'
import { type ColumnDef } from '@tanstack/react-table'
import { CircleCheckBig, CircleX } from 'lucide-react'
import Link from 'next/link'

export const patientVisitColumns: Array<ColumnDef<ExtendedPatientVisitsInterface>> = [
  {
    accessorKey: 'firstName',
    header: 'Patient Name',
    cell: ({ row }) => (
      <div
        className="flex flex-row gap-x-3 items-center
      pt-1 pb-1
      "
      >
        <Avatar
          name={`${row.original?.Patient.firstName} ${row.original?.Patient.middleName}`}
        />
        <Link
          className="capitalize font-semibold text-slate-700 text-[12px] "
          href={`/users/patients/tab/dashboard/${row.original.id}`}
        >{`${row.original?.Patient.firstName} ${row.original?.Patient.middleName}`}</Link>
      </div>
    )
  },
  {
    accessorKey: 'attendedBy',
    header: 'Attended By',
    cell: ({ row }) => (
      <div
        className="flex flex-row gap-x-3 items-center
      pt-1 pb-1
      "
      >
        <Link
          className="capitalize font-semibold text-slate-700 text-[12px] "
          href={`/users/patients/tab/dashboard/${row.original.id}`}
        >{`${row.original?.User?.firstName} ${row.original?.User?.middleName}`}</Link>
      </div>
    )
  },
  {
    accessorKey: 'mmas',
    header: 'MMAS',
    cell: ({ row }) => {
      const { id } = row.original
      const { data } = useGetMmasFourByVisitIDQuery(id)
      const { data: mmas8Data } = useGetMmasEightByVisitIDQuery(id as string, {
        skip: !id
      })
      return (
        <div className="flex flex-col space-y-1 items-start">
          <div
          className='flex flex-row space-x-2 items-center'
          >
            {data
              ? (
              <CircleCheckBig className="text-emerald-500" size={16} />
                )
              : (
              <CircleX size={16} className="text-slate-500" />
                )}
            <p className="text-[12px] font-semibold text-slate-700 ">MMAS-4</p>
          </div>
          <div className="flex items-start flex-row space-x-2">
            {mmas8Data
              ? (
              <CircleCheckBig size={16} className="text-emerald-500" />
                )
              : (
              <CircleX size={16} className="text-slate-500" />
                )}
            <p className="text-[12px] font-semibold text-slate-700">MMAS-8</p>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'disclosure',
    header: 'Partial Disclosure',
    cell: ({ row }) => {
      const { id } = row.original
      const { data } = useGetDisclosureEligibilityByVisitIDQuery(id as string, {
        skip: id == null
      })

      const { data: readinessData } =
        useGetChildCaregiverReadinessByVisitIdQuery(id, {
          skip: id == null
        })
      return (
        <div className="flex flex-col space-y-1 items-start">
          <div className="flex flex-row space-x-2">
            <div>
              {data
                ? (
                <CircleCheckBig size={16} className="text-emerald-500" />
                  )
                : (
                <CircleX size={16} className="text-slate-500" />
                  )}
            </div>
            <p className="text-[12px] font-semibold text-slate-700">
              Eligibility
            </p>
          </div>

          {/*  */}
          <div className='flex flex-row space-x-2 items-center' >
            <div>
              {readinessData
                ? (
                <CircleCheckBig size={16} className="text-emerald-500" />
                  )
                : (
                <CircleX size={16} className='text-slate-500' />
                  )}
            </div>
            <p className='text-[12px] font-semibold text-slate-700' >Readiness</p>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'fullDisclosure',
    header: 'Full Disclosure',
    cell: ({ row }) => {
      const { id } = row.original
      const { data } = useGetExecuteDisclosureByVisitIdQuery(id, {
        skip: !id
      })

      const { data: postData } = useGetPostDisclosureByVisitIdQuery(id, {
        skip: !id
      })
      return (
        <div className="flex flex-col space-y-1 items-start">
          <div className="flex flex-row space-x-2">
            <div>
              {data
                ? (
                <CircleCheckBig size={16} className="text-emerald-500" />
                  )
                : (
                <CircleX size={16} className='text-slate-500' />
                  )}
            </div>
            <p className="text-[12px] font-semibold text-slate-700">Executed</p>
          </div>

          {/*  */}
          <div className="flex flex-row space-x-2">
            <div>
              {postData
                ? (
                <CircleCheckBig size={16} className="text-emerald-500" />
                  )
                : (
                <CircleX size={16} className='text-slate-500' />
                  )}
            </div>
            <p className="text-[12px] font-semibold text-slate-700">
              Post Disclosure
            </p>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'schedule',
    header: 'Schedule',
    cell: ({ row }) => {
      const { id } = row.original
      const { data } = useGetTimeAndWorkByVisitIDQuery(id, {
        skip: !id
      })

      return (
        <div className="flex flex-row space-x-2 items-center">
          <div>
            {data
              ? (
              <CircleCheckBig size={16} className="text-emerald-500" />
                )
              : (
              <CircleX size={16} className="text-slate-500" />
                )}
          </div>
          <p className="text-[12px] font-semibold text-slate-700">Executed</p>
        </div>
      )
    }
  },
  {
    accessorKey: 'action',
    header: 'Action'
    // cell: ({ row }) => (
    //   <Button
    //   className=''
    //   variant={'outline'}
    //   >
    //     <Link href={`/patients/add-triage/${row.original?.Patient?.id}?appointmentID=${row.original?.id} `}>See Patient</Link>
    //   </Button>
    // )
  }
]
