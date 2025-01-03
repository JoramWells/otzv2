/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'

import { useGetPatientByUserIDQuery } from '@/api/patient/patients.api'

// import { type Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import ChatList from '../components/ChatList'
import MessageArea from '../components/MessageArea'
import ChatInput from '../components/ChatInput'
import { useChatSocket } from '@/context/ChatContext'
import { useUserContext } from '@/context/UserContext'

export interface TextChatInputProps {
  type: string
  content: string
  src?: string | null
}

export default function Page () {
  const [text, setText] = useState<TextChatInputProps>({ type: 'text', content: '', src: null })
  const [senderID, setSenderID] = useState<string>()
  const [avatar, setAvatar] = useState<string>()
  const [userName, setUserName] = useState()

  const { chats, messages, activeChat, setActiveChat } = useChatSocket()

  const { data: session } = useSession()

  const { authUser } = useUserContext()
  // useEffect(() => {
  //   if (session) {
  //     const { user } = session

  //     setUserName(`${user.firstName} ${user.middleName}`)
  //   }
  // }, [session])
  const { data: patientData } = useGetPatientByUserIDQuery(authUser?.id as string)
  const lastMessageRef = useRef<HTMLDivElement>(null)

  // const { data: usersData } = useGetAllUsersQuery()

  useEffect(() => {
    if (patientData) {
      setSenderID(patientData.id)
      setAvatar(patientData?.avatar)
    }
  }, [patientData])

  return (
    <div className="p-4 bg-white">
      <div className="flex flex-row h-screen">
        <ChatList data={chats} handleChatChange={setActiveChat} />

        {/*  */}

        <div className="w-3/4 flex flex-col h-screen">
          {/* <MessageArea data={messages}
          lastMessageRef={lastMessageRef}
          /> */}
          <ChatInput
          userName={userName}
          avatar={avatar}
            chatID={activeChat?.chat?.id as string}
            patientID={activeChat?.receiver?.id}
            senderID={senderID as unknown as string}
            text={text}
            setText={setText}
          />
        </div>
      </div>
    </div>
  )
}
