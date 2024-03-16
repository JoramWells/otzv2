/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import { useAddInternalLabRequestMutation } from '@/api/viraload/internalLabRequest.api'
import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import Select from 'react-select'
import { type PatientIDProps } from '../../constants/patient'

const options = [
  {
    value: 1,
    label: 'Adherence Drug Resistance'
  },
  {
    value: 2,
    label: 'CD4 Percentage'
  },
  {
    value: 3,
    label: 'CD4 Count'
  },
  {
    value: 4,
    label: 'HIV DNA Polymerase Chain Reaction, Qualitative'
  },
  {
    value: 5,
    label: 'Viral Load'
  },
  {
    value: 6,
    label: 'Rapid Test for HIV'
  },
  {
    value: 7,
    label: 'Serum Cryptococcal Antigen (CRAG)'
  }
]

const reasonOption = [
  {
    value: 1,
    label: 'Suspected Treatment Failure'
  }
]

const HIVMonitoring = ({ patientID }: PatientIDProps) => {
  // const [specimenType, setSpecimenType] = useState('')
  const [testName, setTestName] = useState({ label: '', value: '' })
  const [urgency, setUrgency] = useState({ label: '', value: '' })
  const [dateRequested, setDateRequested] = useState(new Date())
  const [reason, setReason] = useState({ label: '', value: '' })
  const [addInternalLabRequest, { isLoading }] = useAddInternalLabRequestMutation()
  const inputValues = {
    patientID,
    specimenType: 'Blood',
    testName: testName.label,
    urgency: urgency.label,
    dateRequested,
    reason: reason.label
  }
  return (
    <div className="flex flex-col gap-y-4 w-[600px] border p-5 rounded-lg">
      <p className="text-lg font-bold">HIV Monitoring Tests</p>
      <div>
        <p className="font-bold mb-1">Select Test</p>
        <Select options={options}
        onChange={setTestName}
        value={testName}
        />
      </div>

      <div>
        <p className="font-bold mb-1">Select Urgency</p>
        <Select
        value={urgency}
        onChange={setUrgency}
          options={[
            { value: '1', label: 'Urgent' },
            { value: '2', label: 'Routine' }
          ]}
        />
      </div>
      <div>
        <p className="font-bold mb-1">Select Reason</p>
        <Select
        value={reason}
        onChange={setReason}
        options={reasonOption} />
      </div>
      <div>
        <p className="font-bold mb-1">Select Reason(Other)</p>
        <Select
        value={reason}
        onChange={setReason}
        options={reasonOption} />
      </div>

      {/* 2 */}

      <div className="flex flex-row justify-end gap-x-4">
        <Button size={'sm'}>Clear</Button>
        <Button size={'sm'} colorScheme="teal"
        isLoading={isLoading}
        onClick={() => addInternalLabRequest(inputValues)}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

export default HIVMonitoring
