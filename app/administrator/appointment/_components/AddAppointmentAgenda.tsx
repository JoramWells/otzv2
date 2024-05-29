/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { useAddAppointmentAgendaMutation } from '@/api/appointment/appointmentAgenda.api'
import CustomInput2 from '@/components/forms/CustomInput2'
import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
// import { Button } from '@chakra-ui/react'
import { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z, type ZodType } from 'zod'

interface InputProps {
  agendaDescription: string
}

const Schema: ZodType<InputProps> = z.object({
  agendaDescription: z.string()
})

const AddAppointmentAgenda = () => {
  const methods = useForm<InputProps>({
    resolver: zodResolver(Schema)
  })

  const { toast } = useToast()
  const [addAppointmentAgenda, { isLoading, data }] =
    useAddAppointmentAgendaMutation()

  const handleSubmit = async (data: InputProps) => {
    await addAppointmentAgenda(data)
  }

  const send = useCallback(
    () =>
      toast({
        title: 'Completed',
        description: 'New Agenda Successfully Created',
        action: <ToastAction altText="Saved">Undo</ToastAction>
      }),
    [toast]
  )

  useEffect(() => {
    if (data) {
      console.log(data, 'lop')
      send()
    }
  }, [data, send])

  return (
    <FormProvider {...methods}>
      <form
        className="bg-white
        w-1/4 flex flex-col items-center
      justify-center rounded-lg p-5 gap-y-4"
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <CustomInput2
          label="Agenda Description"
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
          Add Agenda
        </Button>
      </form>
    </FormProvider>
  )
}

export default AddAppointmentAgenda
