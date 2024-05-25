/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
// import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useAddHomeVisitFrequencyMutation } from '@/api/homevisit/homeVisitFrequency.api'
import { Button } from '@/components/ui/button'
import CustomInput from '@/components/forms/CustomInput'
import { Loader2 } from 'lucide-react'

const AddHomeVisitFrequency = () => {
  const [homeVisitFrequencyDescription, setHomeVisitFrequencyDescription] = useState('')
  const [addHomeVisitFrequency, { isLoading }] = useAddHomeVisitFrequencyMutation()
  const inputValues = {
    homeVisitFrequencyDescription
  }

  return (
    <div
      className="border border-gray-200 bg-white
        w-1/4 flex flex-col items-center
      justify-center rounded-lg p-4 gap-y-4"
    >
      <CustomInput
        label="Frequency of Visit"
        value={homeVisitFrequencyDescription}
        onChange={setHomeVisitFrequencyDescription}
      />

      <Button
        className="bg-slate-200 text-black hover:bg-slate-100 shadow-none w-full"
        disabled={isLoading}
        onClick={() => addHomeVisitFrequency(inputValues)}
      >
        {isLoading && <Loader2 className="animate-spin mr-2" size={18} />}
        ADD
      </Button>
    </div>
  )
}

export default AddHomeVisitFrequency
