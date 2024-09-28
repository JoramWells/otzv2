/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { Button } from '@/components/ui/button'
// import { Button } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import CustomInput2 from '@/components/forms/CustomInput2'
import { z, type ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAddAppointmentStatusMutation } from '@/api/appointment/appointmentStatus.api'
import { Loader2 } from 'lucide-react'
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

  const [addAppointmentStatus, { isLoading }] =
    useAddAppointmentStatusMutation()

  const submitForm = async (data: any) => {
    await addAppointmentStatus(data)
  }
  // const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']

  return (
    <FormProvider {...methods} >
      <form
        className="w-1/4 flex flex-col items-center bg-white
      justify-center rounded-lg p-4 gap-y-2 "
      onSubmit={methods.handleSubmit(submitForm)}
      >
        <CustomInput2
          label="Status Description"
          name='statusDescription'
          // value={statusDescription}
          // onChange={setStatusDescription}
        />

        <CustomInput2
        label='Status color'
        type='color'
        name='statusColor'
        defaultValue='#FF6384'
        />

        <Button
          // colorScheme="teal"
          // width={'full'}
          // onClick={() => addAppointmentStatus(inputValues)}
          disabled={isLoading}
          type='submit'
          className="w-full shadow-none text-black border-slate-200 hover:bg-slate-100"
          variant={'outline'}
        >
          {isLoading && <Loader2 className='mr-2 animate-spin' size={15} />}
          Add New
        </Button>
      </form>
    </FormProvider>
  )
}

export default AddAppointmentStatus
