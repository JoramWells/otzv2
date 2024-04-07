'use client'

import { useGetPatientQuery } from '@/api/patient/patients.api'
import { Switch } from '@/components/ui/switch'
import { Divider, Tag } from '@chakra-ui/react'
import React, { useState } from 'react'

// notification type
// lab
// -lab  results updates
//  -lab appointments -vl
// viral load

const dataList = [
  {
    id: 1,
    label: 'Viral Load Collection'
  },
  {
    id: 2,
    label: 'Viral Load Update'
  },
  {
    id: 3,
    label: 'Daily Drug'
  },
  {
    id: 4,
    label: 'Daily Drug Confirmation'
  },
  {
    id: 5,
    label: 'Drug Reorder Level'
  },
  {
    id: 6,
    label: 'Drug Refill Date'
  },
  {
    id: 7,
    label: 'Events'
  }
]

const Settings = ({ params }: any) => {
  const patientID = params.patientID
  const [value, setValue] = useState(1)
  const [isVoiceCall, setIsVoiceCall] = useState<boolean>(false)
  const [isSMS, setIsSMS] = useState<boolean>(false)
  const [isWhatsapp, setIsWhatsapp] = useState<boolean>(false)
  const [isPushNotification, setisPushNotification] = useState<boolean>(false)

  const handleClick = (step) => {
    setValue(step)
  }

  const inputValues = {
    id: patientID,
    notifications: {
      voice: isVoiceCall ? 'SMS' : '',
      sms: '',
      whatsapp: '',
      push: ''
    }
  }
  const { data } = useGetPatientQuery(patientID)
  console.log(data, 'dtx')
  return (
    <div className="mt-12 p-4 flex flex-col space-y-4">
      <p>Notifications</p>
      <div className="flex flex-row w-full space-x-4">
        <div className="flex flex-col space-y-4 w-1/2">
          {dataList.map((item, idx) => (
            <div
              key={item.id}
              className="border border-slate-200 p-2
        rounded-lg flex flex-col space-y-2
        "
              onClick={() => {
                handleClick(item.id)
              }}
            >
              <p className="font-bold">{item.label}</p>
              {/* <div className="flex flex-row space-x-2">
                {['SMS', 'WHATSAPP', 'VOICE', 'IN APP'].map((item, idx) => (
                  <Tag size={'sm'} key={idx}>
                    {item}{' '}
                  </Tag>
                ))}
              </div> */}
            </div>
          ))}
        </div>

        {value === 1 && (
          <div
            className="w-1/2 border border-slate-200 rounded-lg flex-grow-0 flex-shrink-0
      h-[355px]
      "
          >
            <div
              className="bg-slate-50 p-2 border-b border-slate-200
        rounded-t-lg
        "
            >
              <p className="font-bold text-lg pl-2">Notifications</p>
            </div>
            <div className="p-4 flex flex-col space-y-4">
              {/*  */}
              <div className="flex flex-row justify-between">
                <div>
                  <p className="font-bold">VOICE CALL</p>
                  <p className="text-sm text-slate-500">
                    Lorem ipsum may be used as a placeholder before the final
                    copy is available.
                  </p>
                </div>
                <Switch
                  checked={isVoiceCall}
                  // onCheckedChange={}
                />
              </div>
              <Divider />
              <div className="flex flex-row justify-between">
                <div>
                  <p className="font-bold">SMS</p>
                  <p className="text-sm text-slate-500">
                    Lorem ipsum may be used as a placeholder before the final
                    copy is available.
                  </p>
                </div>
                <Switch />
              </div>
              <Divider />

              {/*  */}
              <div className="flex flex-row justify-between">
                <div>
                  <p className="font-bold">WHATSAPP</p>
                  <p className="text-sm text-slate-500">
                    Lorem ipsum may be used as a placeholder before the final
                    copy is available.
                  </p>
                </div>
                <Switch />
              </div>
              {/*  */}
              <Divider />

              {/*  */}
              <div className="flex flex-row justify-between">
                <div>
                  <p className="font-bold">PUSH NOTIFICATION</p>
                  <p className="text-sm text-slate-500">
                    Lorem ipsum may be used as a placeholder before the final
                    copy is available.
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Settings
