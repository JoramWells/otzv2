/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
'use client'

import { useGetFullDisclosureTrackerByStatusQuery, useGetPartialDisclosureTrackerByStatusQuery } from '@/api/treatmentplan/disclosureTracker.api'
import { useGetFullDisclosureCategoryScoreQuery } from '@/api/treatmentplan/full/fullDisclosure.api.ts'
import { useGetPartialDisclosureCategoryScoreQuery } from '@/api/treatmentplan/partial/partialDisclosure.api'
import { useUserContext } from '@/context/UserContext'
import { Trophy } from 'lucide-react'
import moment from 'moment'
import React from 'react'

const TreatmentPlanDashboard = () => {
  const { hospitalID } = useUserContext()
  const { data } = useGetPartialDisclosureCategoryScoreQuery({
    hospitalID: hospitalID as string
  },
  {
    skip: hospitalID == null
  }
  )

  const { data: fData } = useGetFullDisclosureCategoryScoreQuery(
    {
      hospitalID: hospitalID as string
    },
    {
      skip: hospitalID == null
    }
  )

  const { data: groupCount } = useGetFullDisclosureTrackerByStatusQuery({
    hospitalID: hospitalID as string
  }, {
    skip: hospitalID == null
  })

  const { data: pData } = useGetPartialDisclosureTrackerByStatusQuery(
    {
      hospitalID: hospitalID as string
    },
    {
      skip: hospitalID == null
    }
  )

  console.log(pData, groupCount, 'gCount')

  return (
    <div>
      <div className="p-2">
        <div className="rounded-lg bg-white">
          <p>Partial Disclosure</p>
          {data?.map((item, idx) => (
            <div
              className="border border-slate-200 rounded-lg w-1/4 bg-white flex flex-row m-2 p-2 items-center justify-between
            "
              key={idx}
            >
              <div className="flex flex-row space-x-2 items-center">
                <Trophy size={16} />
                <p className="text-[12px] font-semibold text-slate-800">
                  {item?.status}
                </p>
              </div>
              <div>
                <div className="flex flex-row space-x-1">
                  <p className="text-slate-500 text-[12px] font-semibold">
                    Total
                  </p>
                  <p className="text-[12px] text-slate-500">{item?.count}</p>
                </div>
                <div className="flex flex-row space-x-1 text-[12px] text-slate-500">
                  <p className="font-semibold">Last updated</p>
                  <p className="text-[12px] text-slate-500">
                    {moment(item?.latestCreatedAt).format('ll')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*  */}
        <div>
          <p>Full Disclosure</p>
          {fData?.map((item) => (
            <div
              className="border border-slate-200 rounded-lg w-1/4 bg-white flex flex-row m-2 p-2 items-center justify-between
            "
              key={item.id}
            >
              <div className="flex flex-row space-x-2 items-center">
                <Trophy size={16} />
                <p className="text-[12px] font-semibold text-slate-800">
                  {item?.status}
                </p>
              </div>
              <div>
                <div className="flex flex-row space-x-1">
                  <p className="text-slate-500 text-[12px] font-semibold">
                    Total
                  </p>
                  <p className="text-[12px] text-slate-500">{item?.count}</p>
                </div>
                <div className="flex flex-row space-x-1 text-[12px] text-slate-500">
                  <p className="font-semibold">Last updated</p>
                  <p className="text-[12px] text-slate-500">
                    {moment(item?.latestCreatedAt).format('ll')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TreatmentPlanDashboard
