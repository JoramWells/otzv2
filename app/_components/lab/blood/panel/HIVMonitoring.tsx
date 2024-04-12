/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import { useAddInternalLabRequestMutation } from '@/api/viraload/internalLabRequest.api'
import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import Select from 'react-select'
import { type PatientIDProps } from '../../constants/patient'
import CustomSelect from '@/app/_components/forms/CustomSelect'

const options = [
  {
    id: '1',
    label: 'Adherence Drug Resistance'
  },
  {
    id: '2',
    label: 'CD4 Percentage'
  },
  {
    id: '3',
    label: 'CD4 Count'
  },
  {
    id: '4',
    label: 'HIV DNA Polymerase Chain Reaction, Qualitative'
  },
  {
    id: '5',
    label: 'Viral Load'
  },
  {
    id: '6',
    label: 'Rapid Test for HIV'
  },
  {
    id: '7',
    label: 'Serum Cryptococcal Antigen (CRAG)'
  }
]

const reasonOption = [
  {
    id: '1',
    label: 'Suspected Treatment Failure'
  }
]

const HIVMonitoring = ({ patientID }: PatientIDProps) => {
  // const [specimenType, setSpecimenType] = useState('')
  const [testName, setTestName] = useState('')
  const [urgency, setUrgency] = useState('')
  const [dateRequested, setDateRequested] = useState(new Date())
  const [reason, setReason] = useState('')
  const [addInternalLabRequest, { isLoading }] = useAddInternalLabRequestMutation()
  const inputValues = {
    patientID,
    specimenType: 'Blood',
    testName,
    urgency,
    dateRequested,
    reason
  }
  return (
    <div className="flex flex-col gap-y-6 w-3/4 border p-5 rounded-lg">
      <p className="text-lg font-bold">HIV Monitoring Tests</p>

        <CustomSelect
        label='Select Test'
        data={options}
        onChange={setTestName}
        value={testName}
        />

        <CustomSelect
        label='Select Urgency'
        value={urgency}
        onChange={setUrgency}
          data={[
            { id: '1', label: 'Urgent' },
            { id: '2', label: 'Routine' }
          ]}
        />

      <CustomSelect
      label='Select Reason'
      value={reason}
      onChange={setReason}
      data={reasonOption}
      />

        <CustomSelect
        label='Reason (Other)'
        value={reason}
        onChange={setReason}
        data={reasonOption} />

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
