/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useCallback, useState } from 'react'
import SideMenuBar from '../../../_components/treatement-plan/SideMenuBar'

import MMASForm from '@/app/_components/treatement-plan/MMAS'
import FormOne from '@/app/_components/treatement-plan/FormOne'
import DisclosureChecklist from '@/app/_components/treatement-plan/DisclosureChecklist'
import { Avatar } from '@chakra-ui/react'
import FollowUpChecklist from '@/app/_components/treatement-plan/FollowUpChecklist/FollowUpChecklist'

const steps = [
  { title: 'First', description: 'Contact Info' },
  { title: 'Second', description: 'Date & Time' },
  { title: 'Third', description: 'Select Rooms' }
]

const itemList = [
  {
    id: 1,
    label: 'Forms'
  },
  {
    id: 2,
    label: 'Morisky Medication Adherence Scale'
  },
  {
    id: 3,
    label: 'Disclosure Checklist'
  },
  {
    id: 4,
    label: 'Follow Up Checklist'
  }
]

const AddTreatmentPlan = () => {
  const [selected, setSelected] = useState(0)
  const handleStepChange = useCallback((step: number) => {
    setSelected(step)
  }, [])

  return (
    <div className="ml-64 pt-12">
      <div className="p-3 flex flex-row space-x-6">
        <div>
          <div className="flex flex-col items-center justify-center">
            <Avatar name="Lisa Kim" />
            <p className="text-lg mb-4 mt-2">Treatment Plan Forms</p>
          </div>
          <div
            className="p-2 space-y-1 border border-gray-200 w-80
      rounded-md flex flex-col items-center justify-center gap-y-2
      "
            style={{
              height: '250px'
            }}
          >
            {itemList.map((item, idx) => (
              <SideMenuBar
                key={item.id}
                text={item.label}
                onClick={() => {
                  handleStepChange(idx + 1)
                }}
                selected={item.id === 1}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            width: '50%'
          }}
        >
          {selected === 1 && <FormOne />}
          {selected === 2 && <MMASForm />}
          {selected === 3 && <DisclosureChecklist />}
          {selected === 4 && <FollowUpChecklist />}
        </div>
      </div>
    </div>
  )
}

export default AddTreatmentPlan
