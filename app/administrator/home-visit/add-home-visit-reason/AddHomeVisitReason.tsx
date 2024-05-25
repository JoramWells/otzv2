/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
// import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useAddHomeVisitReasonMutation } from '@/api/homevisit/homeVisitReason.api'
import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const AddHomeVisitReason = () => {
  const [homeVisitReasonDescription, setHomeVisitReasonDescription] = useState('')
  const [addHomeVisitReason, { isLoading }] = useAddHomeVisitReasonMutation()
  const inputValues = {
    homeVisitReasonDescription
  }

  return (
    <div
      className="bg-white flex flex-col items-center w-1/4
      justify-center rounded-lg p-4 gap-y-4"
    >
      <CustomInput
        label="Description"
        value={homeVisitReasonDescription}
        onChange={setHomeVisitReasonDescription}
      />

      <Button
        className="bg-slate-200 text-black hover:bg-slate-100 shadow-none w-full"
        disabled={isLoading}
        onClick={() => addHomeVisitReason(inputValues)}
      >
        {isLoading && <Loader2 className='animate-spin mr-2' size={18} />}
        Add
      </Button>
    </div>
  )
}

export default AddHomeVisitReason
