/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetChatQuery } from '@/api/notifications/chat.api'
import { useGetPatientByUserIDQuery } from '@/api/patient/patients.api'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { type ChatAttributes, type MessagesAttributes, type PatientAttributes } from 'otz-types'
import { type Dispatch, type ReactNode, type SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import io, { type Socket } from 'socket.io-client'

interface InputProps {
  children: ReactNode
}

export interface AppContext {
  socket: Socket | undefined
  expoPushToken: string | undefined
  user: PatientAttributes | undefined
  patientID: string | undefined
  activeChat: string | undefined
  setActiveChat: Dispatch<SetStateAction<string[] | null | undefined>>
  messages: MessagesAttributes | undefined

  chats: ChatAttributes[]
}

const initialState: AppContext = {
  socket: undefined,
  user: undefined,
  activeChat: undefined,
  messages: undefined,
  setActiveChat: () => {},
  chats: [],
  expoPushToken: undefined,
  patientID: ''
}

const fetchMessage = async (id: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/notify/messages/detail/${id}`
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

export const ChatContext = createContext(initialState)

export const ChatContextProvider = ({ children }: InputProps) => {
  const [chats, setChats] = useState<ChatAttributes[]>([])
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
  const [userChatsError, setUserChatsError] = useState(null)
  const { data: session, status } = useSession()
  const [activeChat, setActiveChat] = useState()
  const [messages, setMessages] = useState()
  const [socket, setSocket] = useState<Socket>()

  const router = useRouter()
  const userID = session?.user?.id

  const { data: patientData } = useGetPatientByUserIDQuery(userID)

  const { data: chatsData } = useGetChatQuery(patientData?.id)

  useEffect(() => {
    (async () => {
      if (activeChat) {
        const data = await fetchMessage(activeChat?.chat?.id)
        setMessages(data)
      }
    })()
  }, [activeChat])

  useEffect(() => {
    if (chatsData) {
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
                  Messages: [{ createdAt: new Date(), text: recentChat.text }]
                }
              }
            : prevChat
        )
      )

      setMessages(prev => [...prev, recentChat])
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
        setActiveChat,
        isUserChatsLoading,
        userChatsError
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChatSocket = () => useContext(ChatContext)
