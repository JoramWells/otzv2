/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import { Button } from '@/components/ui/button'

import { type ExecuteDisclosureInputProps } from '@/api/treatmentplan/full/executeDisclosure.api'
import { type PostDisclosureInputProps } from '@/api/treatmentplan/full/postDisclosure.api'
import Avatar from '@/components/Avatar'
import CustomSheet from '@/components/nav/CustomSheet'
import Progress from '@/components/Progress'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowRight, Check, MessageSquareOff, XIcon } from 'lucide-react'
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

export const postDisclosureColumns: Array<ColumnDef<PostDisclosureInputProps>> = [
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
            className="capitalize  text-blue-500 font-semibold  hover:cursor-pointer hover:underline "
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
        isAddressedNegativeSelfImage,
        isAssessedChildEngagement,
        isAssessedFunctionalSchoolEngagement,
        isAssessedMoodiness,
        isChildQuestionsAllowed,
        isGivenAppropriateInfo,
        isPeerRelationshipAssessed,
        isReferredForPsychiatric
      } = row.original
      const obj = {
        isAddressedNegativeSelfImage,
        isAssessedChildEngagement,
        isAssessedFunctionalSchoolEngagement,
        isAssessedMoodiness,
        isChildQuestionsAllowed,
        isGivenAppropriateInfo,
        isPeerRelationshipAssessed,
        isReferredForPsychiatric
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
        {row.original.finalComments?.length! > 0 ? (
          <p className="text-[12px]">{row.original.finalComments}</p>
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
    cell: ({ row }) => {
      const {
        isPeerRelationshipAssessed,
        isAssessedChildEngagement,
        isAddressedNegativeSelfImage,
        // isAssessedFunctionalSchoolEngagement,
        isAssessedMoodiness,
        isChildQuestionsAllowed,
        isGivenAppropriateInfo,
        isReferredForPsychiatric
      } = row.original
      return (
        <CustomSheet
          title="Child caregiver readiness"
          label={<ArrowRight size={16} />}
        >
          <div className="flex flex-col space-y-2 overflow-y-auto">
            {isPeerRelationshipAssessed ? (
              <div className="flex flex-row space-x-2 text-emerald-500 border border-emerald-200 bg-slate-100 rounded-lg p-2">
                <Check size={16} />
                <p className="text-[12px]  ">
                  Assessed family, social and peer relationship and support
                  after disclose?
                </p>
              </div>
            ) : (
              <div className="p-2 rounded-lg border bg-slate-50 flex flex-row space-x-2 text-slate-500 ">
                <XIcon size={16} />

                <p className="text-[12px]">
                  Assessed family, social and peer relationship and support
                  after disclose?
                </p>
              </div>
            )}

            {/*  */}
            {isAssessedChildEngagement ? (
              <div className="flex flex-row space-x-2 text-emerald-500 border border-emerald-200 bg-slate-100 rounded-lg p-2">
                <Check size={16} />
                <p className="text-[12px]  ">
                  Assessed the child interest and engagement in children
                  activities like playing?
                </p>
              </div>
            ) : (
              <div className="p-2 rounded-lg border bg-slate-50 flex flex-row space-x-2 text-slate-500 ">
                <XIcon size={16} />

                <p className="text-[12px]">
                  Assessed the child interest and engagement in children
                  activities like playing?
                </p>
              </div>
            )}

            {/*  */}
            {isChildQuestionsAllowed ? (
              <div className="flex flex-row space-x-2 text-emerald-500 border border-emerald-200 bg-slate-100 rounded-lg p-2">
                <Check size={16} />
                <p className="text-[12px]  ">
                  Allowed questions from the child and assessed self-perception
                  and outlook?
                </p>
              </div>
            ) : (
              <div className="p-2 rounded-lg border bg-slate-50 flex flex-row space-x-2 text-slate-500 ">
                <XIcon size={16} />

                <p className="text-[12px]">
                  Allowed questions from the child and assessed self-perception
                  and outlook?
                </p>
              </div>
            )}

            {/*  */}
            {isAddressedNegativeSelfImage ? (
              <div className="flex flex-row space-x-2 text-emerald-500 border border-emerald-200 bg-slate-100 rounded-lg p-2">
                <Check size={16} />
                <p className="text-[12px]  ">
                  Addressed negative body or self-image issues?
                </p>
              </div>
            ) : (
              <div className="p-2 rounded-lg border bg-slate-50 flex flex-row space-x-2 text-slate-500 ">
                <XIcon size={16} />

                <p className="text-[12px]">
                  Addressed negative body or self-image issues?
                </p>
              </div>
            )}

            {/*  */}
            {isAssessedMoodiness ? (
              <div className="flex flex-row space-x-2 text-emerald-500 border border-emerald-200 bg-slate-100 rounded-lg p-2">
                <Check size={16} />
                <p className="text-[12px]  ">
                  Have you assessed the child for moodiness and negative
                  behaviors?
                </p>
              </div>
            ) : (
              <div className="p-2 rounded-lg border bg-slate-50 flex flex-row space-x-2 text-slate-500 ">
                <XIcon size={16} />

                <p className="text-[12px]">
                  Have you assessed the child for moodiness and negative
                  behaviors?
                </p>
              </div>
            )}

            {/*  */}
            {isReferredForPsychiatric ? (
              <div className="flex flex-row space-x-2 text-emerald-500 border border-emerald-200 bg-slate-100 rounded-lg p-2">
                <Check size={16} />
                <p className="text-[12px]  ">
                  Referred appropriately for psychiatrical and other
                  complications developed post disclosure if indicated?
                </p>
              </div>
            ) : (
              <div className="p-2 rounded-lg border bg-slate-50 flex flex-row space-x-2 text-slate-500 ">
                <XIcon size={16} />

                <p className="text-[12px]">
                  Referred appropriately for psychiatrical and other
                  complications developed post disclosure if indicated?
                </p>
              </div>
            )}

            {/*  */}
            {isGivenAppropriateInfo ? (
              <div className="flex flex-row space-x-2 text-emerald-500 border border-emerald-200 bg-slate-100 rounded-lg p-2">
                <Check size={16} />
                <p className="text-[12px]  ">
                  Given age appropriate adherence information?
                </p>
              </div>
            ) : (
              <div className="p-2 rounded-lg border bg-slate-50 flex flex-row space-x-2 text-slate-500 ">
                <XIcon size={16} />

                <p className="text-[12px]">
                  Given age appropriate adherence information?
                </p>
              </div>
            )}

            {/*  */}

            <div className="p-2">
              <p className="font-semibold text-slate-700">Comments</p>
              <Textarea className="shadow-none" placeholder="Enter comments" />
            </div>
            <Button className="mr-2 ml-2" size={'sm'}>
              Save
            </Button>
          </div>
        </CustomSheet>
      )
    }
  }
]

//
export const executeDisclosureColumn: Array<ColumnDef<ExecuteDisclosureInputProps>> = [
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
    accessorKey: 'score',
    header: 'Progress',
    cell: ({ row }) => {
      const customRound = (value: number) => {
        return Math.floor(value / 5) * 5
      }
      const {
        isAssessedChildCaregiverComfort, isAssessedDepthOfChildKnowledge,
        isAssessedEnvironmentAndTiming,
        isConcludedSessionReassured,
        isExplainedCareOptions,
        isInvitedChildQuestions,
        isObservedImmediateReactions,
        isReassuredCaregiver
      } =
        row.original
      const obj = {
        isAssessedChildCaregiverComfort,
        isAssessedDepthOfChildKnowledge,
        isAssessedEnvironmentAndTiming,
        isConcludedSessionReassured,
        isExplainedCareOptions,
        isInvitedChildQuestions,
        isObservedImmediateReactions,
        isReassuredCaregiver
      }

      const bValues = Object.values(obj).filter((item) => item).length
      const percentag = (bValues / Object?.keys(obj).length) * 100

      return <Progress percentage={customRound(percentag)} />
    }
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
    cell: () => <CustomSheet
    title='Disclosure Eligibility'
    label={<ArrowRight size={16} />}
    >
      <div>hello</div>
    </CustomSheet>
  }
]
