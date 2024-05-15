import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

const VisitDetails = () => {
  const [isComplaining, setIsComplaining] = useState(false)
  return (
    <div>
      <div className="flex flex-col space-y-2 mb-2">
        <p>Complaints and History of Complaints</p>

        <CustomCheckbox
          label="Patient complaining today?"
          value={isComplaining}
          onChange={setIsComplaining}
        />
        {isComplaining && (
          <div className="p-4">
            <div className="flex flex-row space-x-4 items-center">
              <CustomSelect label="Complaint" />
              <CustomInput label="Date" type="date" />
            </div>
            <div className="flex flex-row justify-end w-full mt-2">
              <Button
                className="shadow-none bg-slate-50
               text-teal-600 hover:bg-teal-50 border-teal-600"
              >
                <PlusIcon size={18} />
                ADD
              </Button>
            </div>
          </div>
        )}

        {/*  */}
        <div className='flex flex-col space-y-2' >
          <label htmlFor="" className=''>Clinical Notes</label>
          <Textarea />
        </div>
      </div>
    </div>
  )
}

export default VisitDetails
