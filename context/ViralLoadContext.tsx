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
  const { authUser } = useUserContext()
  const [viralLoadData, setViralLoadData] = useState<ExtendedViralLoadInterface[] | undefined>()

  const { data: vlData, isLoading } = useGetAllViralLoadTestsQuery({
    hospitalID: authUser?.hospitalID as string
  })

  useEffect(() => {
    if (vlData) {
      setViralLoadData(vlData)
    }
  }, [vlData])

  return (
    <LabContext.Provider
      value={{
        viralLoadData,
        isLoading
      }}
    >
      {children}
    </LabContext.Provider>
  )
}

export const useLabContext = () => useContext(LabContext)
