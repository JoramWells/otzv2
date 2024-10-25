/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
// import { useGetChatMessageQuery } from "@/api/notifications/messages.api";
import React from 'react'
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'

import { type PatientAttributes } from 'otz-types'
import io, { type Socket } from 'socket.io-client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useGetPatientByUserIDQuery } from '@/api/patient/patients.api'

export interface AppContext {
  user: PatientAttributes | undefined
  onlineUsers: PatientAttributes[]
  setUser: Dispatch<SetStateAction<PatientAttributes | undefined>>
}

const initialState: AppContext = {
  user: undefined,
  onlineUsers: [],
  setUser: () => {}
}

export const UserContext = createContext(initialState)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [socket, setSocket] = useState<Socket>()
  const [onlineUsers, setOnlineUsers] = useState<PatientAttributes[]>([])
  const [user, setUser] = useState<PatientAttributes | undefined>()
  // const [notificationCount, setNotificationCount] = useState(0)
  const { data: patientData } = useGetPatientByUserIDQuery(session?.user.id as string)

  useEffect(() => {
    if (status === 'loading') {
      return
    }
    if (status === 'unauthenticated') {
      // setTimeout(() => {
      //   router.push('/login')
      // }, 2000)
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session != null && patientData?.id !== undefined) {
      const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
        path: '/api/users/socket.io',
        transports: ['websocket'],
        query: {
          patientID: patientData?.id
        }
      })

      newSocket.on('connect', () => {
        newSocket.emit('addNewUser', { id: patientData?.id })
        newSocket.on('getOnlineUsers', (res: PatientAttributes[]) => {
          setOnlineUsers(res)
        })
        setSocket(newSocket)
      })
      return () => {
        newSocket.off('addNewUser')
        newSocket.off('getOnlineUsers')
        newSocket.disconnect()
      }
    }

    // setSocket(newSocket)
    //

    //
    // if()
  }, [patientData?.id, session])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        onlineUsers
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
