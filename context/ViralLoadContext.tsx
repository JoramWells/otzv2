/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable react/react-in-jsx-scope */
// import { useGetChatMessageQuery } from "@/api/notifications/messages.api";
import React from 'react'
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

import { type ExtendedViralLoadInterface, useGetAllViralLoadTestsQuery } from '@/api/enrollment/viralLoadTests.api'
import { useUserContext } from './UserContext'
import { useSession } from 'next-auth/react'

export interface AppContext {
  viralLoadData: ExtendedViralLoadInterface[] | undefined
  isLoading: boolean

  // setAuthUser: Dispatch<SetStateAction<UserInterface | undefined>>;
}

const initialState: AppContext = {
  viralLoadData: undefined,
  isLoading: false

}

export const LabContext = createContext(initialState)

export const LabProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession()
  const [user, setUser] = useState()
  const { authUser } = useUserContext()
  const [viralLoadData, setViralLoadData] = useState<ExtendedViralLoadInterface[] | undefined>()

  // useEffect(() => {
  //   if (session) {
  //     setUser(session.user)
  //   }
  // }, [session])

  // const { data: vlData, isLoading } = useGetAllViralLoadTestsQuery(
  //   {
  //     hospitalID: authUser?.hospitalID as string
  //   },
  //   {
  //     skip: !authUser?.hospitalID
  //   }
  // )

  // console.log(vlData, 'datax')

  // useEffect(() => {
  //   if (vlData) {
  //     setViralLoadData(vlData)
  //   }
  // }, [vlData])

  return (
    <LabContext.Provider
      value={{
        // isLoadinga
        user,
      }}
    >
      {children}
    </LabContext.Provider>
  );
}

export const useLabContext = () => useContext(LabContext)
