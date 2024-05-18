/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAddArtPrescriptionMutation, useGetArtPrescriptionQuery } from '@/api/art/artPrescription.api'
import { useGetAllArtRegimenQuery } from '@/api/art/artRegimen.api.'
import { useGetPatientQuery } from '@/api/patient/patients.api'
import { useGetVitalSignQuery } from '@/api/vitalsigns/vitalSigns.api'
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import { Button } from '@/components/ui/button'
import { calculateAge } from '@/utils/calculateAge'
import { Edit, InfoIcon, Loader2, Plus, RefreshCcw, StopCircle, TabletsIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import CustomInput from '@/components/forms/CustomInput'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomSelect from '@/components/forms/CustomSelect'

const PrescribeComponent = () => {
  const [noOfPill, setNoOfPills] = useState('')
  const [frequency, setFrequency] = useState('')
  const [refillDate, setRefillDate] = useState('')
  return (
    <div className='flex flex-col space-y-4'>
      <CustomInput
        label="Number of Pills"
        onChange={setNoOfPills}
        value={noOfPill}
      />
      <CustomInput
        label="Frequency"
        value={frequency}
        onChange={setFrequency}
      />
      <CustomInput
        label="Refill Date"
        onChange={setRefillDate}
        value={refillDate}
        type="date"
      />

      <Button
      className='w-full bg-slate-200 hover:bg-slate-100 text-black shadow-none'
      >Save</Button>
    </div>
  )
}

const StopComponent = () => {
  const [stopReason, setStopReason] = useState('')
  return (
    <div
    className='flex flex-col space-y-4'
    >
      <CustomInput label="Reason"
      value={stopReason}
      onChange={setStopReason}
      />
      <Button
      className='w-full bg-slate-200 hover:bg-slate-100 shadow-none text-black'
      >Stop Regimen</Button>
    </div>
  )
}

interface InputProps {
  id: string
  label: string
}

const SwitchComponent = ({ regimenOptions }: { regimenOptions: InputProps[] }) => {
  const [switchReason, setSwitchReason] = useState('')
  const [artName, setArtName] = useState('')
  return (
    <div className="flex flex-col space-y-4">
      <CustomSelect
        label="Art Name"
        value={artName}
        onChange={setArtName}
        data={regimenOptions}
      />
      <CustomSelect
        label="Switch Reason"
        value={switchReason}
        onChange={setSwitchReason}
        data={[
          {
            id: 'Suspected Treatment Failure',
            label: 'Suspected Treatment Failure'
          }
        ]}
      />
      <Button className="w-full bg-slate-200 hover:bg-slate-100 shadow-none text-black">
        Switch Regimen
      </Button>
    </div>
  )
}

const dataList = [
  {
    id: 1,
    label: 'Prescribe',
    icon: <TabletsIcon className="mr-2" size={18} />,
    color: 'blue'
  },
  {
    id: 2,
    label: 'Stop',
    icon: <StopCircle className="mr-2" size={18} />,
    color: 'red'
  },
  {
    id: 3,
    label: 'Switch',
    icon: <RefreshCcw className="mr-2" size={18} />,
    color: 'teal'
  }
]

const ArtRegimenDialog = ({ patientID }: { patientID: string }) => {
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('appointmentID')
  const { data: patientData } = useGetPatientQuery(patientID)
  const { data: prescriptionData } = useGetArtPrescriptionQuery(patientID)

  const [startDate, setStartDate] = useState('')

  const { data } = useGetAllArtRegimenQuery()
  const { data: vsData } = useGetVitalSignQuery(appointmentID)
  const [regimenLine, setRegimenLine] = useState('first line')
  const [isStandardRegimen, setIsStandardRegimen] = useState(false)
  const [isNonStandardRegimen, setIsNonStandardRegimen] = useState(false)
  const [artRegimen, setArtRegimen] = useState('')
  const [nonStandardArtRegimen, setNonStandardArtRegimen] = useState('')
  const regimenOptions = useCallback(() => {
    const tempData = data?.filter((item: any) => item.ArtCategory.artPhase.toString().toLowerCase().includes(regimenLine.toLowerCase()))

    return tempData?.map((item: any) => ({
      id: item.artName,
      label: item.artName
    }))
  }, [data, regimenLine])

  const [addArtPrescription, { isLoading }] = useAddArtPrescriptionMutation()

  const inputValues = {
    patientID,
    regimen: artRegimen,
    line: regimenLine,
    startDate,
    isStandard: isStandardRegimen
  }

  const [tab, setTab] = useState(1)

  return (
    <div className="w-full flex justify-between items-center bg-[#F4FAFF] p-2 rounded-lg">
      <p className='font-bold'>Regimen</p>
      {prescriptionData ? (
        <div className="bg-[#F1F1E6] p-4 rounded-lg flex flex-row justify-between items-center">
          <p>{prescriptionData?.regimen}</p>
          <div>
            <CaseManagerDialog
              label={<Edit className="" size={18} />}
              width="750px"
            >
              <p className="text-lg font-bold">Manage Patient Regimen</p>
              <div className="flex flex-row space-x-4">
                {dataList.map((item) => (
                  <Button
                    onClick={() => {
                      setTab(item.id)
                    }}
                    key={item.id}
                    className={`bg-${item.color}-50 hover:bg-${
                      item.color
                    }-50 text-${item.color}-600 shadow-none ${
                      item.id === tab && 'bg-blue-100'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                ))}
              </div>

              {tab === 1 && <PrescribeComponent />}
              {tab === 2 && <StopComponent />}
              {tab === 3 && (
                <SwitchComponent regimenOptions={regimenOptions()} />
              )}
            </CaseManagerDialog>
          </div>
        </div>
      ) : (
        <CaseManagerDialog label={<Plus className='text-slate-500' size={18}/>}>
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex w-full justify-end">
              <InfoIcon size={18} />
            </div>
            <p>Age {patientData && calculateAge(patientData?.dob)} years</p>
            <p>Weight {vsData?.weight} kg </p>
          </div>

          {/*  */}

          <div className="flex flex-col space-y-4">
            <div>
              <CustomSelect
                label="Regimen Line"
                value={regimenLine}
                onChange={setRegimenLine}
                data={[
                  {
                    id: 'first Line',
                    label: 'First Line'
                  },
                  {
                    id: 'second Line',
                    label: 'Second Line'
                  },
                  {
                    id: 'third Line',
                    label: 'Third Line'
                  }
                ]}
              />
            </div>

            <CustomCheckbox
              label="Standard Regimen"
              value={isStandardRegimen}
              onChange={setIsStandardRegimen}
            />

            {isStandardRegimen && (
              <div>
                <CustomSelect
                  value={artRegimen}
                  onChange={setArtRegimen}
                  data={regimenOptions()}
                />
              </div>
            )}

            <CustomCheckbox
              label="Non Standard Regimen"
              value={isNonStandardRegimen}
              onChange={setIsNonStandardRegimen}
            />
            {isNonStandardRegimen && (
              <div>
                <CustomSelect
                  value={nonStandardArtRegimen}
                  onChange={setNonStandardArtRegimen}
                  data={[
                    {
                      id: 'lopinavir',
                      label: 'Lopinavir'
                    }
                  ]}
                />
              </div>
            )}
            <CustomInput
              label="Start Date"
              type="date"
              value={startDate}
              onChange={setStartDate}
            />
            <Button
              className="bg-slate-100 text-slate-700 shadow-none hover:bg-slate-50"
              onClick={async () => await addArtPrescription(inputValues)}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="animate-spin mr-2" size={18} />}
              Save
            </Button>
          </div>
        </CaseManagerDialog>
      )}
    </div>
  )
}

export default ArtRegimenDialog
