/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useAddVitalSignMutation, useGetVitalSignQuery } from '@/api/vitalsigns/vitalSigns.api'
import CustomInput2 from '@/components/forms/CustomInput2'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

interface AddTriageProps {
  handleNext: () => void
  handleBack: () => void
  patientID: string
  activeStep: number
};

// interface InputProps {
//   name: string
// }

const AddTriage = ({
  patientID,
  handleNext,
  handleBack,
  activeStep
}: AddTriageProps) => {
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('appointmentID')

  // const [isPregnant, setIsPregnant] = useState(false)

  // const inputValues = {
  //   patientID,
  //   temperature,
  //   weight,
  //   height,
  //   systolic,
  //   diastolic,
  //   muac: MUAC,
  //   oxygenSAturation: oxygen,
  //   pulseRate,
  //   respiratoryRate,
  //   patientVisitID: appointmentID
  // }

  const submitForm = async (data: any) => {
    console.log({ patientVisitID: appointmentID, ...data })
    await addVitalSign(data)
  }
  //
  const [addVitalSign, { isLoading, data: vlDataResponse }] = useAddVitalSignMutation()
  const { data: appointmentData } = useGetVitalSignQuery(appointmentID)

  const methods = useForm()

  useEffect(() => {
    if (appointmentData) {
      methods.reset(appointmentData)
    }
  }, [methods, appointmentData])

  console.log(appointmentData, 'loi')

  return (
    <FormProvider {...methods}>
        <form
          className="w-full p-2 rounded-lg flex flex-col space-y-4"
          onSubmit={methods.handleSubmit(submitForm)}
        >
          <CustomInput2
            label="Temperature *"
            // description='Temperature range 0-32c'
            name="temperature"
            // onChange={setTemperature}
          />

          <div className="w-full flex justify-between items-center space-x-8">
            <CustomInput2
              label="Pulse Rate"
              name="pulseRate"
              // onChange={setPulseRate}
            />
            <CustomInput2
              label="Respiratory Rate"
              name="respiratoryRate"
              // onChange={setRespiratoryRate}
            />
          </div>

          <div>
            <p className="font-bold mb-1">Blood Pressure</p>
            <div className="flex flex-row w-full space-x-4 items-center">
              <CustomInput2
                label="Systolic"
                name="systolic"
                // onChange={setSystolic}
              />
              <CustomInput2
                label="Diastolic"
                name="diastolic"
                // onChange={setDiastolic}
              />
            </div>{' '}
          </div>

          <CustomInput2
            label="Oxygen Saturation"
            name="oxygenSAturation"
            // onChange={setOxygen}
          />

          <div className="flex flex-row space-x-4">
            <CustomInput2
              label="Weight"
              // value={weight}
              // onChange={setWeight}
              name="weight"
            />
            <CustomInput2
              label="Height"
              // value={height}
              // onChange={setheight}
              name="height"
            />
          </div>
          <div className="border-b border-slate-200 w-full mt-top-2 mt-b-2 font-bold" />
          <p className="font-bold capitalize">Other recordings</p>
          <CustomInput2 name="muac" label="MUAC" />
          <CustomInput2 name="lmp" label="LMP" />

          <div className="flex w-full justify-end">
            {vlDataResponse ? (
              <Button
                onClick={() => {
                  handleNext()
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                className="bg bg-blue-500 text-white shadow-none hover:bg-blue-500 "
                // onClick={async () => await addVitalSign(inputValues)}
                disabled={isLoading}
                type="submit"
              >
                {isLoading && (
                  <Loader2 className="animate-spin mr-2" size={18} />
                )}
                Save
              </Button>
            )}
          </div>
        </form>
    </FormProvider>
  )
}

export default AddTriage
