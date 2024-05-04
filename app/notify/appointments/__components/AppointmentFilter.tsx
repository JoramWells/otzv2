import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

export function AppointmentFilter () {
  const [isRefill, setIsRefill] = useState<boolean>(false)
  const [startDate, setStartDate] = useState('')
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full justify-end flex flex-row mt-2 mb-2">
          <SlidersHorizontal className="hover:cursor-pointer" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Select filter</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <p>Select Agenda</p>
          <CustomCheckbox
            label="Refill"
            value={isRefill}
            onChange={setIsRefill}
          />

          {/*  */}
          <CustomCheckbox
            label="Clinic Day"
            value={isRefill}
            onChange={setIsRefill}
          />

          {/*  */}
          <CustomCheckbox
            label="Support group"
            value={isRefill}
            onChange={setIsRefill}
          />

          <p>Select Date Range</p>
          <CustomInput
            label="Start Date"
            type="date"
            value={startDate}
            onChange={setStartDate}
          />

          <CustomInput
            label="End Date"
            type="date"
            value={startDate}
            onChange={setStartDate}
          />

          <p>Status</p>
          <CustomCheckbox
            label="Pending"
            value={isRefill}
            onChange={setIsRefill}
          />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
