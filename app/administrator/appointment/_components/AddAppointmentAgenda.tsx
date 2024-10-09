/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import CustomInput2 from '@/components/forms/CustomInput2'
import { Button } from '@/components/ui/button'
// import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { type AppointmentAgendaAttributes } from 'otz-types'
// import { Button } from '@chakra-ui/react'
import { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z, type ZodType } from 'zod'

interface InputProps {
  agendaDescription: string
}

const Schema: ZodType<InputProps> = z.object({
  agendaDescription: z.string({
    required_error: 'Agenda description required!'
  }).refine(data => data.trim() !== '', {
    message: 'Agenda description is required'
  })
})

interface AddAppointmentAgendaAttributes {
  addAppointmentAgenda: (input: AppointmentAgendaAttributes) => Promise<{ data?: undefined }>
  data: AppointmentAgendaAttributes
  isLoading: boolean
}

const AddAppointmentAgenda = ({ addAppointmentAgenda, data, isLoading }: AddAppointmentAgendaAttributes) => {
  const methods = useForm<AppointmentAgendaAttributes>({
    resolver: zodResolver(Schema)
  })

  const { toast } = useToast()

  const handleSubmit = async (data: AppointmentAgendaAttributes) => {
    await addAppointmentAgenda(data)
  }

  const send = useCallback(
    () =>
      toast({
        // variant:'success',
        title: 'Completed',
        description: 'New Agenda Successfully Created'
        // action: <ToastAction altText="Saved">Undo</ToastAction>
      }),
    [toast]
  )

  useEffect(() => {
    if (data) {
      send()
    }
  }, [data, send])

  return (
    <FormProvider {...methods}>
      <form
        className="bg-white
        w-1/3 flex flex-col items-center
      justify-center rounded-lg p-4 space-y-4"
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <div
        className='w-full'
        >
          <p
          className='text-slate-700 font-bold'
          >Create New Agenda</p>
        </div>
        <CustomInput2
          label="Agenda Description*"
          name="agendaDescription"
          // onChange={setAgendaDescription}
        />

        <Button
          type="submit"
          //   width={'full'}
          disabled={isLoading}
          className="w-full shadow-none active:outline  text-black border-teal-200 bg-slate-200 hover:bg-slate-100"
        >
          {isLoading && <Loader2 className="mr-2" size={18} />}
          Save
        </Button>
      </form>
    </FormProvider>
  )
}

export default AddAppointmentAgenda
