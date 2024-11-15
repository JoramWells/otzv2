/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useGetAllPillDailyUptakeQuery } from '@/api/treatmentplan/uptake.api'
import { type ExtendedAdherenceAttributes } from '@/app/pill-box/reminder/column'
import useNotification from '@/hooks/useNotification'
import { checkTimeOfDay } from '@/utils/checkTimeOfDay'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import { type UserInterface } from 'otz-types'
// import { useSession } from 'next-auth/react'
import { createContext, type Dispatch, type SetStateAction, useContext, useEffect, useState, type ReactNode } from 'react'
import io from 'socket.io-client'

interface UptakeCountInterface {
  morningTrue: number
  morningFalse: number
  eveningTrue: number
  eveningFalse: number
}

interface PharmacyContextProps {
  adherenceData: ExtendedAdherenceAttributes[] | null | undefined
  uptakeCount: UptakeCountInterface
  setAdherenceData: Dispatch<SetStateAction<ExtendedAdherenceAttributes[] | null | undefined>>
}

const defaultUptakeCount = {
  eveningFalse: 0,
  eveningTrue: 0,
  morningFalse: 0,
  morningTrue: 0
}

export const PharmacyContext = createContext<PharmacyContextProps>({
  adherenceData: [],
  uptakeCount: defaultUptakeCount,
  setAdherenceData: () => {}
})

const updatePillStatus = (data: ExtendedAdherenceAttributes[], id: string, medicineTime: string, status: boolean) => {
  if (data.length > 0) {
    return data?.map((obj: any) => {
      if (obj.id === id) {
        if (medicineTime === 'morning') {
          return { ...obj, morningStatus: status }
        }
        return { ...obj, eveningStatus: status }
      }
      return obj as ExtendedAdherenceAttributes[]
    })
  }
  return null
}

function countStatus (data: ExtendedAdherenceAttributes[]) {
  return data?.reduce((acc, curr) => {
    if (curr.morningStatus === true) {
      acc.morningTrue += 1
    } else {
      acc.morningFalse += 1
    }

    if (curr.eveningStatus === true) {
      acc.eveningTrue += 1
    } else {
      acc.eveningFalse += 1
    }
    return acc
  },
  { morningTrue: 0, morningFalse: 0, eveningTrue: 0, eveningFalse: 0 }
  )
}

export const PharmacyProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession()
  const [user, setUser] = useState<UserInterface>()

  const [adherenceData, setAdherenceData] = useState<ExtendedAdherenceAttributes[] | null>()
  const [uptakeCount, setUptakeCount] = useState<UptakeCountInterface>(defaultUptakeCount)
  const currentDate = moment().format('YYYY-MM-DD')

  useEffect(() => {
    if (session) {
      const { user } = session
      setUser(user as UserInterface)
    }
  }, [session])
  const { data } = useGetAllPillDailyUptakeQuery({
    date: currentDate as unknown as Date,
    hospitalID: user?.hospitalID as string
  })

  //   Get session of already registered user

  const showNotification = useNotification()

  useEffect(() => {
    if (data != null) {
      setAdherenceData(data)
      const uptake = countStatus(data)
      setUptakeCount(uptake)
    }
  }, [data])

  useEffect(() => {
    // const { user } = session ?? {}

    const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
      path: '/api/pharmacy/socket.io'
    //   transports: ['websocket']
    })

    newSocket.on('connect', () => {
      //
      const timeOfDay = checkTimeOfDay().toLowerCase()
      // if (session != null) {
      // newSocket.emit('getPharmacyNotifications', user)
      newSocket.on(
        'newPharmacyNotifications',
        (data: ExtendedAdherenceAttributes) => {
          const { id, morningStatus, eveningStatus } = data
          //
          showNotification(data.userName, id)
          //
          if (
            adherenceData != null &&
            morningStatus !== undefined &&
            eveningStatus !== undefined
          ) {
            // setUptakeData(patientsDueMorning)
            if (timeOfDay === 'morning') {
              const updatedData = updatePillStatus(
                adherenceData,
                id,
                timeOfDay,
                morningStatus
              )
              setAdherenceData(updatedData)
              // console.log(data, 'uio')
            } else if (timeOfDay === 'evening') {
              const updatedData = updatePillStatus(
                adherenceData,
                id,
                timeOfDay,
                eveningStatus
              )
              setAdherenceData(updatedData)
              setUptakeCount(
                countStatus(updatedData as ExtendedAdherenceAttributes[])
              )
            } else {
              const updatedData = updatePillStatus(
                adherenceData,
                id,
                'evening',
                morningStatus
              )
              setAdherenceData(updatedData)
            }
          }
        }
      )
    })

    newSocket.on('connect_error', (err) => {
      console.log('Error!!', err)
    })
    // }

    return () => {
      newSocket.off('getPharmacyNotifications')
      newSocket.disconnect()
    }
  }, [adherenceData, showNotification])

  return (
    <PharmacyContext.Provider
      value={{
        adherenceData,
        uptakeCount,
        setAdherenceData
      }}
    >
      {children}
    </PharmacyContext.Provider>
  )
}

export const usePharmacyContext = () => useContext(PharmacyContext)
