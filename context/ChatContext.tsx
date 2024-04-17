/* eslint-disable @typescript-eslint/no-unused-vars */
import { type ReactNode, createContext, useState } from 'react'

interface InputProps {
  children: ReactNode
  user: string
}

export const ChatContext = createContext({})

export const ChatContextProvider = ({ children, user }: InputProps) => {
  const [userChats, setUserChats] = useState(null)
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
  const [userChatsError, setUserChatsError] = useState(null)
  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
