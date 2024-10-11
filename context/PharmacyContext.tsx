import { useGetAllPillDailyUptakeQuery } from '@/api/treatmentplan/uptake.api'
import { type ExtendedAdherenceAttributes } from '@/app/pill-box/reminder/morningColumn'
import { checkTimeOfDay } from '@/utils/checkTimeOfDay'
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
  const [adherenceData, setAdherenceData] = useState<ExtendedAdherenceAttributes[] | null>()
  const [uptakeCount, setUptakeCount] = useState<UptakeCountInterface>(defaultUptakeCount)
  const { data } = useGetAllPillDailyUptakeQuery()

  //   Get session of already registered user
  //   const { data: session } = useSession()

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

    const timeOfDay = checkTimeOfDay().toLowerCase()
    console.log(timeOfDay, 'kop')
    // if (session != null) {
    // newSocket.emit('getPharmacyNotifications', user)
    newSocket.on('newPharmacyNotifications', (data: ExtendedAdherenceAttributes) => {
      const { id, morningStatus, eveningStatus } = data
      if (adherenceData != null && morningStatus !== undefined && eveningStatus !== undefined) {
        // setUptakeData(patientsDueMorning)
        if (timeOfDay === 'morning') {
          const updatedData = updatePillStatus(
            adherenceData,
            id,
            timeOfDay,
            morningStatus
          )
          setAdherenceData(updatedData)
        } else if (timeOfDay === 'evening') {
          const updatedData = updatePillStatus(
            adherenceData,
            id,
            timeOfDay,
            eveningStatus
          )
          setAdherenceData(updatedData)
          setUptakeCount(countStatus(updatedData as ExtendedAdherenceAttributes[]))
          console.log(updatedData, 'uio')
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
    })

    newSocket.on('connect_error', (err) => {
      console.log('Error!!', err)
    })
    // }

    return () => {
      newSocket.off('getPharmacyNotifications')
      newSocket.disconnect()
    }
  }, [adherenceData])

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
