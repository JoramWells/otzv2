import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { PlusIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

interface ComplaintsProps {
  complaint: string
  onSetDate: string
}

const VisitDetails = () => {
  const [isComplaining, setIsComplaining] = useState(false)
  const [complaints, setComplaints] = useState<ComplaintsProps[]>([])
  const [complaintDate, setComplaintDate] = useState('')
  const [complaint, setComplaint] = useState('')
  const handleAddNumbers = () => {
    const todaysComplaints: ComplaintsProps = {
      complaint,
      onSetDate: complaintDate
    }
    setComplaints(prev => [...prev, todaysComplaints])
    // setPhoneNo('')
    setComplaint('')
    setComplaintDate('')
    console.log(complaints)
  }
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
            <div className='w-full flex flex-col space-y-2  rounded-lg p-2 bg-slate-50 mb-2'>
              <p className='font-bold'>Today Complaints</p>
              {complaints.map((item) => (
                <div
                  key={item.complaint}
                  className="flex justify-between w-full bg-white rounded-lg p-2"
                >
                  <p>{item.complaint}</p>
                  <div className="flex space-x-4 items-center">
                    <p>{item.onSetDate} </p>
                    <XIcon size={18} className="hover:cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-row space-x-4 items-center">
              <CustomSelect
                label="Complaint"
                value={complaint}
                onChange={setComplaint}
                data={[
                  {
                    id: 'Breast Pain',
                    label: 'Breast Pain'
                  },
                  {
                    id: 'Convulsions',
                    label: 'Convulsions'
                  },
                  {
                    id: 'Chest Pain',
                    label: 'Chest Pain'
                  }
                ]}
              />
              <CustomInput
                label="Date"
                type="date"
                value={complaintDate}
                onChange={setComplaintDate}
              />
            </div>
            <div className="flex flex-row justify-end w-full mt-2">
              <Button
                className="shadow-none bg-slate-50
               text-teal-600 hover:bg-teal-50 border-teal-600"
                onClick={handleAddNumbers}
              >
                <PlusIcon size={18} />
                ADD
              </Button>
            </div>
          </div>
        )}

        {/*  */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="" className="">
            Clinical Notes
          </label>
          <Textarea />
        </div>
      </div>
    </div>
  )
}

export default VisitDetails
