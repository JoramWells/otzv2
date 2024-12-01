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
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowRight, CircleCheckBig, CircleX } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const columns: Array<
ColumnDef<ExtendedPatientVisitsInterface>
> = [
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
        <IsCompletedComponent
          data1={data}
          title1="MMAS-4"
          data2={mmas8Data}
          title2="MMAS-8"
        />
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
        <IsCompletedComponent
          data1={data}
          title1="Disclosed"
          data2={readinessData}
          title2="Child Readiness"
        />
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
        <IsCompletedComponent
          data1={data}
          title1="Execute"
          data2={postData}
          title2="Post Disclosure"
        />
      )
    }
  },
  {
    accessorKey: 'schedule',
    header: 'Time Schedule',
    cell: ({ row }) => {
      const { id } = row.original
      const { data } = useGetTimeAndWorkByVisitIDQuery(id, {
        skip: !id
      })

      return (
        <div>
          {data
            ? (
            <div className="flex flex-row space-x-2 items-center">
              <CircleCheckBig size={16} className="text-emerald-500" />
              <p className="text-[12px] font-semibold text-emerald-500">Yes</p>
            </div>
              )
            : (
            <div className="flex flex-row space-x-2 items-center">
              <CircleX size={16} className="text-slate-500" />
              <p className="text-[12px] font-semibold text-slate-700">No</p>
            </div>
              )}
        </div>
      )
    }
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const router = useRouter()
      return (
      <ArrowRight
      size={18}
      className='hover:cursor-pointer hover:text-slate-500 text-slate-400 '
        onClick={() => { router.push(`/users/patients/tab/visit-detail/${row.original.id}`) }}
      />
      )
    }
  }
]

const IsCompletedComponent = ({
  data1,
  data2,
  title1,
  title2
}: {
  data1: any
  data2: any
  title1: string
  title2: string
}) => {
  return (
    <div className="flex flex-col space-y-1 items-start">
      <div className="flex flex-row space-x-2">
        <div>
          {data1
            ? (
            <CircleCheckBig size={16} className="text-emerald-500" />
              )
            : (
            <CircleX size={16} className="text-slate-500" />
              )}
        </div>
        <p className="text-[12px] font-semibold text-slate-700">{title1}</p>
      </div>

      {/*  */}
      <div className="flex flex-row space-x-2">
        <div>
          {data2
            ? (
            <CircleCheckBig size={16} className="text-emerald-500" />
              )
            : (
            <CircleX size={16} className="text-slate-500" />
              )}
        </div>
        <p className="text-[12px] font-semibold text-slate-700">{title2}</p>
      </div>
    </div>
  )
}
