'use client'
import React, { useState } from 'react'
import CustomCheckbox from '../../_components/forms/CustomCheckbox'
import CustomSelect from '../../_components/forms/CustomSelect'
import { Button } from '@/components/ui/button'

const CaseManager = () => {
  const [userID, setUser] = useState('')
  const [notifications, setNotifications] = useState<boolean>(false)
  const [drugUptake, setDrugUptake] = useState<boolean>(false)
  const [appointment, setAppointment] = useState<boolean>(false)
  const [refill, setRefill] = useState<boolean>(false)
  const [vlTrack, setVLTrack] = useState<boolean>(false)

  return (
    <div className="p-4">
      <div
        className="w-1/2 border border-slate-200 p-4 rounded-lg
      flex flex-col space-y-4
      "
      >
        <CustomSelect
          label="Select Case Manager"
          data={[]}
          value={userID}
          onChange={setUser}
        />
        <CustomCheckbox
          label="Allow Notifications"
          description="Notify case manager wit every action"
          value={notifications}
          onChange={setNotifications}
        />
        <div
          className="flex flex-col space-y-4 bg-slate-50
        p-2 rounded-lg border border-slate-200
        "
        >
          <p className="text-lg font-bold text-slate-500">Cases</p>
          <div
            className="flex flex-col space-y-4
          ml-4
          "
          >
            <CustomCheckbox
              label="Drug Uptake"
              description="Notify te manager everytime te patient is up for medicine"
              value={drugUptake}
              onChange={setDrugUptake}
            />
            <CustomCheckbox
              label="Appointments"
              description="Notify te manager for patients appointment date and time"
              value={appointment}
              onChange={setAppointment}
            />
            <CustomCheckbox
              label="Refill"
              description="Notify te manager for patients dru refill"
              value={refill}
              onChange={setRefill}
            />
            <CustomCheckbox
              label="VL Trackin"
              description="Notify te manager for patients VL"
              value={vlTrack}
              onChange={setVLTrack}
            />
          </div>
        </div>
        <Button
          size={'lg'}
          className="shadow-none bg-teal-600 hover:bg-teal-700"
        >
          Add Case Manager
        </Button>
      </div>
    </div>
  )
}

export default CaseManager
