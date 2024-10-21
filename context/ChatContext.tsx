/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetChatQuery } from '@/api/notifications/chat.api'
import { useGetPatientByUserIDQuery } from '@/api/patient/patients.api'
import axios, { type AxiosResponse } from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { type MessagesAttributes, type PatientAttributes } from 'otz-types'
import { type Dispatch, type ReactNode, type SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import io, { type Socket } from 'socket.io-client'

interface InputProps {
  children: ReactNode
}

export interface ChatsInterface {
  id: string
  chat: {
    id: string
    Messages: Array<{
      createdAt: string
      text: string
      type: string
    }>
  }
  receiver: {
    id: string | undefined
    firstName: string
    secondName: string
  }
}

export interface AppContext {
  socket: Socket | undefined
  activeChat: ChatsInterface | undefined
  setActiveChat: Dispatch<SetStateAction<ChatsInterface | undefined>>
  messages: MessagesAttributes[] | undefined

  chats: ChatsInterface[]
}

const initialState: AppContext = {
  socket: undefined,
  activeChat: undefined,
  messages: undefined,
  setActiveChat: () => {},
  chats: []
}

const fetchMessage = async (id: string): Promise<MessagesAttributes[] | undefined> => {
  try {
    const response: AxiosResponse<MessagesAttributes[]> = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/notify/messages/detail/${id}`
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const ChatContext = createContext(initialState)

export const ChatContextProvider = ({ children }: InputProps) => {
  const [chats, setChats] = useState<ChatsInterface[]>([])
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
  const [userChatsError, setUserChatsError] = useState(null)
  const { data: session, status } = useSession()
  const [activeChat, setActiveChat] = useState<ChatsInterface | undefined>()
  const [messages, setMessages] = useState<MessagesAttributes[]>()
  const [socket, setSocket] = useState<Socket>()

  const router = useRouter()
  const userID = session?.user?.id

  const { data: patientData } = useGetPatientByUserIDQuery(userID as string)

  const { data: chatsData } = useGetChatQuery(patientData?.id as string)

  useEffect(() => {
    void (async () => {
      if (activeChat != null) {
        const data = await fetchMessage(activeChat?.chat?.id)
        setMessages(data)
      }
    })()
  }, [activeChat])

  useEffect(() => {
    if (chatsData != null) {
      setChats(chatsData)
    }
  }, [chatsData])

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
    const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
      path: '/api/notify/socket.io'
      // transports: ['websocket']
    })

    //
    setSocket(newSocket)
    //
    newSocket.on('getNewChats', (recentChat) => {
      setChats((prevChats) =>
        prevChats.map((prevChat) =>
          prevChat?.chat?.id === recentChat.chatID?.trim()
            ? {
                ...prevChat,
                chat: {
                  ...prevChat.chat,
                  // Messages: [{ createdAt: new Date().toISOString(), text: recentChat }]
                  Messages: [{ createdAt: new Date().toISOString(), type: recentChat.type, text: recentChat.text }]
                }
              }
            : prevChat
        )
      )

      setMessages(prev => [...(prev ?? []), recentChat])
    })
    return () => {
      newSocket.off('getNewChats')
      newSocket.disconnect()
    }
  }, [])

  console.log(messages, 'messages')

  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChat,
        messages,
        socket,
        setActiveChat
        // isUserChatsLoading,
        // userChatsError
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChatSocket = () => useContext(ChatContext)
