/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { Button } from '@/components/ui/button'
// import { Button } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import CustomInput2 from '@/components/forms/CustomInput2'
import { z, type ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
interface InputProps {
  statusDescription: string
}

const Schema: ZodType<InputProps> = z.object({
  statusDescription: z.string()
})

const AddAppointmentStatus = () => {
  const methods = useForm<InputProps>({
    resolver: zodResolver(Schema)
  })

  // const [addAppointmentStatus, { isLoading }] =
  //   useAddAppointmentStatusMutation()

  const submitForm = async(data: any) => {
   await addAppointmentStatus(data)
  }

  return (
    <FormProvider {...methods} >
      <form
        className="w-1/4 flex flex-col items-center bg-white
      justify-center rounded-lg p-4 gap-y-4 "
      onSubmit={methods.handleSubmit(submitForm)}
      >
        <CustomInput2
          label="Status Description"
          name='statusDescription'
          // value={statusDescription}
          // onChange={setStatusDescription}
        />

        <Button
          // colorScheme="teal"
          // width={'full'}
          // onClick={() => addAppointmentStatus(inputValues)}
          // isLoading={isLoading}
          type='submit'
          className="w-full shadow-none text-emerald-600 border-teal-200"
          variant={'outline'}
        >
          Add New
        </Button>
      </form>
    </FormProvider>
  )
}

export default AddAppointmentStatus
