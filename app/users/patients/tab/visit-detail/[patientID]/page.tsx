/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useGetAllDisclosureChecklistByVisitIdQuery } from '@/api/treatmentplan/disclosureChecklist.api'
import { useSearchParams } from 'next/navigation'

const DetailPage = ({ params }: { params: string }) => {
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('visitID')
  // const { patientID } = params
  const { data: disclosureData } = useGetAllDisclosureChecklistByVisitIdQuery(appointmentID)
  return (
      <div>
        {disclosureData && (
          <div>
            <div>Triage</div>
            {disclosureData?.map((item: any) => (
              <div key={item.id}>{item.temperature}</div>
            ))}
          </div>
        )}

        {disclosureData && (
          <div>
            <div>Disclosure Checklist</div>
            {disclosureData?.map((item: any) => (
              <div key={item.id}>
                {item.isWillingToDisclose && (
                  <div>Patient is Willing to disclose</div>
                )}
              </div>
            ))}
          </div>
        )}
        <div>MMAS</div>
        <div>Follow Up Checklist</div>
      </div>
  )
}

export default DetailPage
