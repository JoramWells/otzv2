/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useGetAllDisclosureChecklistByVisitIdQuery } from '@/api/treatmentplan/disclosureChecklist.api'
import { useGetAllVitalSignDetailQuery } from '@/api/vitalsigns/vitalSigns.api'
import { useSearchParams } from 'next/navigation'

const DetailPage = ({ params }: { params: string }) => {
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('visitID')
  // const { patientID } = params
  const { data: vsData } = useGetAllVitalSignDetailQuery(appointmentID)
  const { data: disclosureData } = useGetAllDisclosureChecklistByVisitIdQuery(appointmentID)
  console.log(disclosureData, 'lop')
  return (
    <div>
      <div>
        {vsData && (
          <div>
            <div>Triage</div>
            {vsData?.map((item) => (
              <div key={item.id}>{item.temperature}</div>
            ))}
          </div>
        )}

        {disclosureData && (
          <div>
            <div>Disclosure Checklist</div>
            {disclosureData?.map((item) => (
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
    </div>
  );
}

export default DetailPage
