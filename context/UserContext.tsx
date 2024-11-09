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
  userSocket: Socket | undefined
  setUser: Dispatch<SetStateAction<PatientAttributes | undefined>>
  setModuleID: Dispatch<SetStateAction<string | undefined | null>>
}

const initialState: AppContext = {
  user: undefined,
  userSocket: undefined,
  onlineUsers: [],
  setUser: () => {},
  setModuleID: () => {}
}

export const UserContext = createContext(initialState)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [onlineUsers, setOnlineUsers] = useState<PatientAttributes[]>([])
  const [user, setUser] = useState<PatientAttributes | undefined>()
  // const [notificationCount, setNotificationCount] = useState(0)
  const { data: patientData } = useGetPatientByUserIDQuery(session?.user.id as string)
  const [userSocket, setUserSocket] = useState<Socket>()
  const [moduleID, setModuleID] = useState<string | undefined | null>()
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
    if (session != null) {
      const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
        path: '/api/users/socket.io',
        transports: ['websocket'],
        query: {
          patientID: patientData?.id,
          userID: session.user.id,
          moduleID
        }
      })

      newSocket.on('connect', () => {
        newSocket.emit('addNewAdminUser', { id: patientData?.id })
        newSocket.emit('addNewUser', { id: patientData?.id })
        newSocket.on('getOnlineUsers', (res: PatientAttributes[]) => {
          setOnlineUsers(res)
        })
        setUserSocket(newSocket)
      })

      newSocket.on('connect_error', (err) => {
        console.log('Error!!', err)
      })
      return () => {
        newSocket.off('addNewUser')
        newSocket.off('addNewAdminUser')
        newSocket.off('getOnlineUsers')
        newSocket.disconnect()
      }
    }

    // setSocket(newSocket)
    //

    //
    // if()
  }, [moduleID, patientData?.id, session])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        onlineUsers,
        userSocket,
        setModuleID
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
