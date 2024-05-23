/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  useAddArtPrescriptionMutation,
  useGetArtPrescriptionQuery
} from '@/api/art/artPrescription.api'
import { useGetAllArtRegimenQuery } from '@/api/art/artRegimen.api.'
import { Button } from '@/components/ui/button'
import {
  Loader2,
  RefreshCcw,
  StopCircle,
  TabletsIcon
} from 'lucide-react'
import { useCallback, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import CustomInput from '@/components/forms/CustomInput'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomSelect from '@/components/forms/CustomSelect'
import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import { useAddPrescriptionMutation } from '@/api/pillbox/prescription.api'

const StopComponent = () => {
  const [stopReason, setStopReason] = useState('')
  return (
    <div className="flex flex-col space-y-4">
      <CustomInput label="Reason" value={stopReason} onChange={setStopReason} />
      <Button className="w-full bg-slate-200 hover:bg-slate-100 shadow-none text-black">
        Stop Regimen
      </Button>
    </div>
  )
}

interface InputProps {
  id: string
  label: string
}

const SwitchComponent = ({
  regimenOptions
}: {
  regimenOptions: InputProps[]
}) => {
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

interface InputProps {
  handleNext: () => void
  handleBack: () => void
  patientID: string
}

const AddART = ({ patientID, handleBack, handleNext }: InputProps) => {
  const [noOfPill, setNoOfPills] = useState('')
  const [frequency, setFrequency] = useState('')
  const [refillDate, setRefillDate] = useState('')

  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('appointmentID')
  const { data: prescriptionData } = useGetArtPrescriptionQuery(patientID)
  const { data: agendaData } = useGetAllAppointmentAgendaQuery()
  const { data: statusData } = useGetAllAppointmentStatusQuery()
  const { data: userData } = useGetAllUsersQuery()

  const [addPrescription, { isLoading: prescriptionSaveLoading }] = useAddPrescriptionMutation()

  const agendaDataOptions = useCallback(() => {
    return agendaData?.filter(
      (item: any) => item.agendaDescription.toLowerCase() === 'refill'
    ) || []
  }, [agendaData])

  const statusOptions = useCallback(() => {
    return statusData?.filter(
      (item: any) => item.statusDescription.toLowerCase() === 'upcoming'
    ) || []
  }, [statusData])

  const prescriptionInputValues = {
    patientID,
    frequency,
    noOfPill,
    refillDate,
    userID: userData?.[0].id,
    patientVisitID: appointmentID,
    appointmentAgendaID: agendaDataOptions?.()[0]?.id,
    appointmentStatusID: statusOptions?.()[0]?.id
  }

  const [startDate, setStartDate] = useState('')

  const { data } = useGetAllArtRegimenQuery()
  const [regimenLine, setRegimenLine] = useState('first line')
  const [isStandardRegimen, setIsStandardRegimen] = useState(false)
  const [isNonStandardRegimen, setIsNonStandardRegimen] = useState(false)
  const [artRegimen, setArtRegimen] = useState('')
  const [nonStandardArtRegimen, setNonStandardArtRegimen] = useState('')
  const regimenOptions = useCallback(() => {
    const tempData = data?.filter((item: any) =>
      item.ArtCategory.artPhase
        .toString()
        .toLowerCase()
        .includes(regimenLine.toLowerCase())
    )

    return tempData?.map((item: any) => ({
      id: item.artName,
      label: item.artName
    }))
  }, [data, regimenLine])

  const [addArtPrescription, { isLoading, data: addPrescriptionData }] = useAddArtPrescriptionMutation()

  const inputValues = {
    patientID,
    regimen: artRegimen,
    line: regimenLine,
    startDate,
    isStandard: isStandardRegimen
  }

  const [tab, setTab] = useState(1)

  return (
    <div className="w-full flex justify-between items-center">
      {prescriptionData ? (
        <div className="rounded-lg flex flex-col justify-between items-center w-full">
          {/* <p>{prescriptionData?.regimen}</p> */}
          <div className="w-full flex flex-col space-y-2">
            <p className="text-lg font-bold">Manage Patient Regimen</p>
            <div>
              <p>{prescriptionData?.regimen}</p>
              <p className="capitalize">{prescriptionData?.line}</p>
            </div>
            <div className="flex flex-row space-x-4">
              {dataList.map((item) => (
                <Button
                  onClick={() => {
                    setTab(item.id)
                  }}
                  key={item.id}
                  className={`bg-white shadow-none  text-slate-500 border border-slate-200 hover:bg-slate-100  ${
                    item.id === tab && 'bg-slate-50 text-black'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </div>

            {tab === 1 && (
              <div className="flex flex-col space-y-4  border  rounded-lg p-4">
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
                  onClick={async () =>
                    await addPrescription(prescriptionInputValues)
                  }
                  disabled={prescriptionSaveLoading}
                >
                  {prescriptionSaveLoading && <Loader2 className='mr-2' size={18} />}
                  Save
                </Button>
              </div>
            )}
            {tab === 2 && <StopComponent />}
            {tab === 3 && <SwitchComponent regimenOptions={regimenOptions()} />}
          </div>
          {/*  */}
          <div className="flex justify-end mt-4 space-x-4 w-full">
            <Button
              onClick={() => {
                handleBack()
              }}
              className="bg-slate-200 shadow-none text-black hover:bg-slate-100"
            >
              Prev
            </Button>
            {prescriptionData || addPrescriptionData ? (
              <Button
                className="bg-slate-200 shadow-none hover:bg-slate-100 text-black"
                onClick={() => {
                  handleNext()
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                className="bg-slate-200 shadow-none hover:bg-slate-100 text-black"
                onClick={async () => await addArtPrescription(inputValues)}
              >
                {isLoading && (
                  <Loader2 className="animate-spin mr-2" size={18} />
                )}
                Save
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div
          // label={<Plus className="text-slate-500" size={18} />}
          className="w-full"
        >
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
          </div>
          <div className="flex justify-end mt-4 space-x-4">
            <Button
              onClick={() => {
                handleBack()
              }}
              className="bg-slate-200 shadow-none text-black hover:bg-slate-100"
            >
              Prev
            </Button>
            {prescriptionData || addPrescriptionData ? (
              <Button
                className="bg-slate-200 shadow-none hover:bg-slate-100 text-black"
                onClick={() => {
                  handleNext()
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                className="bg-slate-200 shadow-none hover:bg-slate-100 text-black"
                onClick={async () => await addArtPrescription(inputValues)}
              >
                {isLoading && (
                  <Loader2 className="animate-spin mr-2" size={18} />
                )}
                Save
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AddART
