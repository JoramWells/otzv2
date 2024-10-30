/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import { Button } from '@/components/ui/button'

import { type MMASEightInterface } from '@/api/treatmentplan/mmasEight.api'
import { type ChildCaregiverReadinessProps } from '@/api/treatmentplan/partial/childCaregiverReadiness.api'
import Avatar from '@/components/Avatar'
import CustomSheet from '@/components/nav/CustomSheet'
import Progress from '@/components/Progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowRight, BadgeCheck, MessageSquareOff, XCircle } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { type MMASFourAttributes } from 'otz-types'
// import { FaEdit } from 'react-icons/fa'

//
export interface VitalSignsInterface {
  id: string
  patient: {
    id: string
    avatar: string
    firstName: string
    middleName: string
  }
  height: string
  weight: string
  diastolic: string
  systolic: string
  respiratoryRate: string
  oxygenSAturation: string
  lmp: string
  muac: string
  edd: string
  parity: string
  gravida: string
  pulseRate: string
  createdAt: string
}

export type MMASInterface = MMASFourAttributes & {
  Patient: {
    firstName: string
    middleName: string
    avatar: string
  }
}

export const columns: Array<ColumnDef<ChildCaregiverReadinessProps>> = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => {
      const { firstName, middleName, avatar } = row.original.Patient
      return (
        <div
          className="flex flex-row gap-x-3 items-center
      pt-1 pb-1 text-[12px]
      "
        >
          {avatar ? (
            <Image
              // w={0}
              alt="im"
              // placeholder="data:image/..."
              width={25}
              height={25}
              // quality={25}
              // fill
              // objectFit='contain'
              // priority
              className="rounded-full"
              src={`${process.env.NEXT_PUBLIC_API_URL}/api/users/${avatar}`}
              style={{
                width: '25px',
                height: '25px',
                objectFit: 'cover'
              }}
            />
          ) : (
            <Avatar name={`${firstName} ${middleName}`} />
          )}
          <Link
            className="capitalize  text-blue-500  hover:cursor-pointer hover:underline "
            href={'/users/patients/tab/dashboard/'}
          >{`${firstName} ${middleName}`}</Link>
        </div>
      )
    }
  },

  {
    accessorKey: 'isForget',
    header: 'Score',
    cell: ({ row }) => {
      // const customRound = (value: number) => {
      //   return Math.floor(value / 5) * 5
      // }
      const {
        isAssessedCaregiverReadinessToDisclose,
        isCaregiverCommunicatedToChild,
        isChildKnowsMedicineAndIllness,
        isChildSchoolEngagement,
        isConsistentSocialSupport,
        isFreeChildCaregiverFromSevereIllness,
        isInterestInEnvironmentAndPlaying,
        isSecuredPatientInfo
      } = row.original
      const obj = {
        isFreeChildCaregiverFromSevereIllness,
        isConsistentSocialSupport,
        isInterestInEnvironmentAndPlaying,
        isChildKnowsMedicineAndIllness,
        isCaregiverCommunicatedToChild,
        isSecuredPatientInfo,
        isAssessedCaregiverReadinessToDisclose,
        isChildSchoolEngagement
      }
      const bValues = Object.values(obj).filter((item) => item).length

      const percentag = (bValues / Object?.keys(obj).length) * 100
      // setPercentage(customRound(percentag));
      return (
        <div>
          <Progress percentage={percentag} />
        </div>
      )
    }
  },
  {
    accessorKey: 'taskTwoComments',
    header: 'comments',
    cell: ({ row }) => (
      <div>
        {row.original.taskTwoComments?.length > 0 ? (
          <p className="text-[12px]">{row.original.taskTwoComments}</p>
        ) : (
          <div className="flex space-x-2 items-center">
            <MessageSquareOff size={16} className="text-slate-500" />
            <p className="text-[12px]">No Comment</p>
          </div>
        )}
      </div>
    )
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated',
    cell: ({ row }) => (
      <div className="text-[12px] text-slate-500">
        {moment(row.original.createdAt).calendar()}
      </div>
    )
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <div>
        <CustomSheet
          title="Child caregiver readiness"
          label={<ArrowRight size={16} />}
        >
          <div className="flex flex-col space-y-2">
            <p className="text-[12px]">
              Child/ caregiver free from severe physical illness, trauma,
              psychological illness or psychiatric illness?
            </p>
            <p className="text-[12px]">
              Child has consistent family, peer or social support?
            </p>
            <p className="text-[12px]">
              Child demonstrates interest in the environment and playing
              activities?
            </p>
            <p className="text-[12px]">
              Assessed what the child already knows about the medicines and
              illness and addressed needs and concerns?
            </p>
            <p className="text-[12px]">
              Assessed functional school engagement by the child consistent,
              attendance, interacts well with the school community, able to
              freely discuss school activities?
            </p>

            <p className="text-[12px]">
              Assessed caregiver readiness for disclosure to the child?
            </p>
            <p className="text-[12px]">
              Assessed what the caregiver has communicated to the child?
            </p>

            <p className="text-[12px]">
              Discussed management of confidentiality of information regarding
              one health with the child and caregiver?
            </p>
            <div>
              <p className='font-semibold text-slate-700' >Comments</p>
              <Textarea className='shadow-none'
              placeholder='Enter comments'
               />
            </div>
            <Button
            className=''
            size={'sm'}
            >
              Save
            </Button>
          </div>
        </CustomSheet>
      </div>
    )
  }
]

//
export const mmas8columns: Array<ColumnDef<MMASEightInterface>> = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => {
      const { firstName, middleName, avatar } = row.original.Patient
      return (
        <div
          className="flex flex-row gap-x-3 items-center
      pt-1 pb-1 text-[12px]
      "
        >
          {avatar ? (
            <Image
              // w={0}
              alt="im"
              // placeholder="data:image/..."
              width={25}
              height={25}
              // quality={25}
              // fill
              // objectFit='contain'
              // priority
              className="rounded-full"
              src={`${process.env.NEXT_PUBLIC_API_URL}/api/users/${avatar}`}
              style={{
                width: '25px',
                height: '25px',
                objectFit: 'cover'
              }}
            />
          ) : (
            <Avatar name={`${firstName} ${middleName}`} />
          )}
          <Link
            className="capitalize  text-blue-500  hover:cursor-pointer hover:underline "
            href={'/users/patients/tab/dashboard/'}
          >{`${firstName} ${middleName}`}</Link>
        </div>
      )
    }
  },
  {
    accessorKey: 'isUnderPressure',
    header: 'Under Pressure',
    cell: ({ row }) => (
      <>
        {row.original?.isUnderPressure ? (
          <Badge className="bg-emerald-50 text-emerald-500 shadow-none hover:bg-emerald-200">
            <BadgeCheck size={16} />
            <p className="ml-2">Yes</p>
          </Badge>
        ) : (
          <Badge className="bg-red-50 text-red-500 shadow-none hover:bg-red-200">
            <XCircle size={16} />
            <p className="ml-2">No</p>
          </Badge>
        )}
      </>
    )
  },
  {
    accessorKey: 'difficultyRemembering',
    header: 'Difficulty Remembering',
    cell: ({ row }) => (
      <>
        {row.original?.difficultyRemembering ? (
          <Badge className="bg-emerald-50 text-emerald-500 shadow-none hover:bg-emerald-200">
            <BadgeCheck size={16} />
            <p className="ml-2">Yes</p>
          </Badge>
        ) : (
          <Badge className="bg-red-50 text-red-500 shadow-none hover:bg-red-200">
            <XCircle size={16} />
            <p className="ml-2">No</p>
          </Badge>
        )}
      </>
    )
  },
  {
    accessorKey: 'isTookMedYesterday',
    header: 'Took Yesterday',
    cell: ({ row }) => (
      <>
        {row.original?.isTookMedYesterday ? (
          <Badge className="bg-emerald-50 text-emerald-500 shadow-none hover:bg-emerald-200">
            <BadgeCheck size={16} />
            <p className="ml-2">Yes</p>
          </Badge>
        ) : (
          <Badge className="bg-red-50 text-red-500 shadow-none hover:bg-red-200">
            <XCircle size={16} />
            <p className="ml-2">No</p>
          </Badge>
        )}
      </>
    )
  },
  {
    accessorKey: 'isQuitOutControl',
    header: 'Quit/Control',
    cell: ({ row }) => (
      <>
        {row.original?.isQuitOutControl ? (
          <Badge className="bg-emerald-50 text-emerald-500 shadow-none hover:bg-emerald-200">
            <BadgeCheck size={16} />
            <p className="ml-2">Yes</p>
          </Badge>
        ) : (
          <Badge className="bg-red-50 text-red-500 shadow-none hover:bg-red-200">
            <XCircle size={16} />
            <p className="ml-2">No</p>
          </Badge>
        )}
      </>
    )
  },
  {
    accessorKey: 'totalScores',
    header: 'Total Score',
    cell: ({ row }) => {
      const { totalScores } = row.original

      return <p className="text-[12px]">{totalScores}</p>
    }
  }
]
