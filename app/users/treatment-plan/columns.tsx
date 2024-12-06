/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable multiline-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useAddPatientVisitMutation } from '@/api/patient/patientVisits.api'
import { useGetExecuteDisclosureByPatientIDQuery } from '@/api/treatmentplan/full/executeDisclosure.api'
import { useGetPostDisclosureByPatientIDQuery } from '@/api/treatmentplan/full/postDisclosure.api'
import { useGetMmasEightByPatientIDQuery } from '@/api/treatmentplan/mmasEight.api'
import { useGetChildCaregiverReadinessByPatientIDQuery } from '@/api/treatmentplan/partial/childCaregiverReadiness.api'
import { useGetDisclosureEligibilityByPatientIDQuery } from '@/api/treatmentplan/partial/disclosureEligibility.api'
import { useGetPartialDisclosureByPatientIDQuery } from '@/api/treatmentplan/partial/partialDisclosure.api'
import Progress from '@/components/Progress'
import { useUserContext } from '@/context/UserContext'
import { type PatientProps } from '@/types'
import { calculateAge } from '@/utils/calculateAge'
import { Avatar } from '@chakra-ui/react'
import { type ColumnDef } from '@tanstack/react-table'
import { AlertTriangle, Calendar, CalendarX2, SquareArrowOutUpLeft, SquareArrowOutUpRight } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import { type PatientAttributes } from 'otz-types'
import { Suspense, useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

// import { FaEdit } from 'react-icons/fa'

export const columns: Array<ColumnDef<PatientAttributes>> = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => (
      <div>
        <div
          className="flex flex-row gap-x-3 items-center
      pt-1.5 pb-1.5 text-[12px]
      "
        >
          <Avatar
            size={'sm'}
            className="font-bold"
            name={`${row.original?.firstName} ${row.original?.middleName}`}
          />
          <div>
            <Link
              className="capitalize font-bold text-slate-700 underline"
              href={`/users/patients/tab/dashboard/${row.original.id}`}
              target="_blank"
            >{`${row.original?.firstName} ${row.original?.middleName}`}</Link>
            <p className="font-semibold text-slate-500">{calculateAge(row.original.dob)} years</p>
          </div>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'mmas8',
    header: 'MMAS8',
    cell: ({ row }) => {
      const { id } = row.original
      const { data } = useGetMmasEightByPatientIDQuery(row.original.id as string
        // {
        //   skip: !id
        // }
      )
      const [addPatientVisit] =
        useAddPatientVisitMutation()
      const { authUser } = useUserContext()
      const [patientVisitID, setPatientVisitID] = useState()
      const handleStartVisit = useCallback(
        async (path: string) => {
          const newVisitID = uuidv4()
          const inputValues = {
            patientID: id,
            userID: authUser?.id,
            id: newVisitID
          }
          if (id) {
            setPatientVisitID(patientVisitID)
            await addPatientVisit(inputValues)

            // if (patientVisitID && patientVisitID !== 'undefined') {
            //   linkRef.current?.click()
            // }
            return `${path}${newVisitID}&step=5`
          }
        },
        [addPatientVisit, authUser?.id, id, patientVisitID]
      )

      const generateHref = async () => {
        const url = await handleStartVisit(
          `/users/patients/tab/steps/${row.original.id}?appointmentID=`
        )
        return url
      }

      const handleClick = async (
        e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
      ) => {
        e.preventDefault() // Prevent default navigation
        const url = await generateHref()
        window.open(url, '_blank') // Open in a new tab
      }

      return (
        <Suspense fallback={<div>loading</div>}>
          {data ? (
            <div>
              <div className="flex flex-row space-x-2">
                <p className="text-[12px] font-semibold text-slate-500">
                  Score:
                </p>
                <p className="text-[12px] text-slate-700 font-semibold ">
                  {data?.totalScores}
                </p>
              </div>
              <div className="flex flex-row space-x-2 items-center">
                <Calendar size={16} className="text-slate-500" />
                <p className="text-[12px] text-slate-500">
                  {moment(data?.createdAt).format('ll')}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-row hover:cursor-pointer underline items-center text-blue-500 space-x-2 ">
              <a
                // ref={linkRef}
                // target='_blank'
                // onClick={async () =>
                // await handleStartVisit(
                // href={async () => {
                //   return await handleStartVisit(`/users/patients/tab/steps/${row.original.id}?appointmentID=&step=5`)
                // }}
                className="text-[12px] flex flex-row"
                href="#"
                onClick={async (e) => await handleClick(e)}
                //   )
                // }
                // size={'sm'}
                // variant={'link'}
              >
                Update
              </a>
              <SquareArrowOutUpRight size={14} />
            </div>
          )}
        </Suspense>
      )
    }
    // enableSorting: true
  },
  {
    accessorKey: 'disclosure',
    header: 'Partial Disclosure',
    cell: ({ row }) => {
      const { id, dob } = row.original
      const age = calculateAge(dob)

      const [addPatientVisit] =
              useAddPatientVisitMutation()
      const { authUser } = useUserContext()
      const [patientVisitID, setPatientVisitID] = useState()
      const handleStartVisit = useCallback(
        async (path: string) => {
          const newVisitID = uuidv4()
          const inputValues = {
            patientID: id,
            userID: authUser?.id,
            id: newVisitID
          }
          setPatientVisitID(patientVisitID)
          await addPatientVisit(inputValues)

          // if (patientVisitID && patientVisitID !== 'undefined') {
          //   linkRef.current?.click()
          // }
          return `${path}${newVisitID}&step=6`
        },
        [addPatientVisit, authUser?.id, id, patientVisitID]
      )

      const generateHref = async () => {
        const url = await handleStartVisit(
                `/users/patients/tab/steps/${row.original.id}?appointmentID=`
        )
        return url
      }

      const handleClick = async (
        e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
      ) => {
        e.preventDefault() // Prevent default navigation
        const url = await generateHref()
        window.open(url, '_blank') // Open in a new tab
      }

      const { data: pData } = useGetPartialDisclosureByPatientIDQuery(id, {
        skip: !id
      })

      console.log(pData, 'pDatax')

      // skip if user is not ready for partial disclosure
      const { data } = useGetChildCaregiverReadinessByPatientIDQuery(
        id as string,
        {
          skip: !id
        }
      )
      const { data: disclosureEligibilityData } =
        useGetDisclosureEligibilityByPatientIDQuery(id as string, {
          skip: !id
        })
      let percentage = 0
      if (data && disclosureEligibilityData) {
        const {
          isAssessedCaregiverReadinessToDisclose,
          isCaregiverCommunicatedToChild,
          isChildKnowsMedicineAndIllness,
          isChildSchoolEngagement,
          isConsistentSocialSupport,
          isFreeChildCaregiverFromSevereIllness,
          isInterestInEnvironmentAndPlaying,
          isSecuredPatientInfo
        } = data

        const { isCorrectAge, isKnowledgeable, isWillingToDisclose } =
          disclosureEligibilityData

        const disclosureObj = {
          isCorrectAge,
          isKnowledgeable,
          isWillingToDisclose
        }

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

        const disclosureValues = Object.values(disclosureObj).filter(
          (item) => item
        ).length

        const bValues = Object.values(obj).filter((item) => item).length

        const disclosurePercentage =
          (disclosureValues / Object?.keys(obj).length) * 100
        const eligibilityPercentage =
          (bValues / Object?.keys(obj).length) * 100

        percentage = (disclosurePercentage + eligibilityPercentage) / 2
      }

      return (
        <Suspense fallback={<div>loading..</div>}>

              {data ? (
                <div>
                  <p className="text-[12px] text-slate-500">
                    Percentage progress
                  </p>
                  <Progress percentage={percentage} />
                </div>
              ) : (
                <div className="flex flex-row hover:cursor-pointer underline items-center text-blue-500 space-x-2 ">
                  <a
                    // ref={linkRef}
                    // target='_blank'
                    // onClick={async () =>
                    // await handleStartVisit(
                    // href={async () => {
                    //   return await handleStartVisit(`/users/patients/tab/steps/${row.original.id}?appointmentID=&step=5`)
                    // }}
                    className="text-[12px] flex flex-row"
                    href="#"
                    onClick={async (e) => await handleClick(e)}
                    //   )
                    // }
                    // size={'sm'}
                    // variant={'link'}
                  >
                    Update
                  </a>
                  <SquareArrowOutUpRight size={14} />
                </div>
              )}

        </Suspense>
      )
    }
  },
  {
    accessorKey: 'fullDisclosure',
    header: 'Full Disclosure',
    cell: ({ row }) => {
      const { id, dob } = row.original
      const [addPatientVisit] =
      useAddPatientVisitMutation()
      const { authUser } = useUserContext()
      const [patientVisitID, setPatientVisitID] = useState()
      const handleStartVisit = useCallback(
        async (path: string) => {
          const newVisitID = uuidv4()
          const inputValues = {
            patientID: id,
            userID: authUser?.id,
            id: newVisitID
          }
          setPatientVisitID(patientVisitID)
          await addPatientVisit(inputValues)

          // if (patientVisitID && patientVisitID !== 'undefined') {
          //   linkRef.current?.click()
          // }
          return `${path}${newVisitID}&step=6`
        },
        [addPatientVisit, authUser?.id, id, patientVisitID]
      )

      const generateHref = async () => {
        const url = await handleStartVisit(
        `/users/patients/tab/steps/${row.original.id}?appointmentID=`
        )
        return url
      }

      const handleClick = async (
        e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
      ) => {
        e.preventDefault() // Prevent default navigation
        const url = await generateHref()
        window.open(url, '_blank') // Open in a new tab
      }

      const { data: executeDisclosureData } =
        useGetExecuteDisclosureByPatientIDQuery(id as string, {
          skip: !id
        })
      const { data: postDisclosureData } = useGetPostDisclosureByPatientIDQuery(
        id as string,
        {
          skip: !id
        }
      )
      let percentage = 0
      if (executeDisclosureData && postDisclosureData) {
        const {
          isAssessedChildCaregiverComfort,
          isAssessedDepthOfChildKnowledge,
          isAssessedEnvironmentAndTiming,
          isConcludedSessionReassured,
          isExplainedCareOptions,
          isInvitedChildQuestions,
          isObservedImmediateReactions,
          isReassuredCaregiver
        } = executeDisclosureData
        const executeDisclosureObj = {
          isAssessedChildCaregiverComfort,
          isAssessedDepthOfChildKnowledge,
          isAssessedEnvironmentAndTiming,
          isConcludedSessionReassured,
          isExplainedCareOptions,
          isInvitedChildQuestions,
          isObservedImmediateReactions,
          isReassuredCaregiver
        }

        // post disclosure
        const {
          isAddressedNegativeSelfImage,
          isAssessedChildEngagement,
          isAssessedFunctionalSchoolEngagement,
          isAssessedMoodiness,
          isChildQuestionsAllowed,
          isGivenAppropriateInfo,
          isPeerRelationshipAssessed,
          isReferredForPsychiatric
        } = postDisclosureData
        const postDisclosureObj = {
          isAddressedNegativeSelfImage,
          isAssessedChildEngagement,
          isAssessedFunctionalSchoolEngagement,
          isAssessedMoodiness,
          isChildQuestionsAllowed,
          isGivenAppropriateInfo,
          isPeerRelationshipAssessed,
          isReferredForPsychiatric
        }

        //
        const executeDisclosureDataValues = Object.values(
          executeDisclosureObj
        ).filter((item) => item).length
        const postDisclosureDataValues = Object.values(
          postDisclosureObj
        ).filter((item) => item).length

        //
        const disclosurePercentage =
          (executeDisclosureDataValues /
            Object?.keys(executeDisclosureObj).length) *
          100
        const eligibilityPercentage =
          (postDisclosureDataValues / Object?.keys(postDisclosureObj).length) *
          100

        percentage = (disclosurePercentage + eligibilityPercentage) / 2
      }
      return (
        <div>

                    {postDisclosureData ? (
            <Progress percentage={percentage} />
                    ) : (
                      <div className="flex flex-row hover:cursor-pointer underline items-center text-blue-500 space-x-2 ">
                      <a
                        // ref={linkRef}
                        // target='_blank'
                        // onClick={async () =>
                        // await handleStartVisit(
                        // href={async () => {
                        //   return await handleStartVisit(`/users/patients/tab/steps/${row.original.id}?appointmentID=&step=5`)
                        // }}
                        className="text-[12px] flex flex-row"
                        href="#"
                        onClick={async (e) => await handleClick(e)}
                        //   )
                        // }
                        // size={'sm'}
                        // variant={'link'}
                      >
                        Update
                      </a>
                      <SquareArrowOutUpRight size={14} />
                    </div>
                    )}

        </div>
      )
    }
  }
]
