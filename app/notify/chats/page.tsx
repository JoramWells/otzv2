/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'

import { useGetPatientByUserIDQuery } from '@/api/patient/patients.api'

// import { type Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { type MessagesAttributes } from 'otz-types'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import ChatList from '../components/ChatList'
import MessageArea from '../components/MessageArea'
import ChatInput from '../components/ChatInput'
import { useChatSocket } from '@/context/ChatContext'

export default function Page () {
  const [recentChats, setRecentChats] = useState<MessagesAttributes[]>([])
  const [text, setText] = useState('')
  const [senderID, setSenderID] = useState()

  const { chats, messages, activeChat, setActiveChat } = useChatSocket()

  const { data: session } = useSession()

  const userID = session?.user?.id
  const { data: patientData } = useGetPatientByUserIDQuery(userID)

  // const { data: usersData } = useGetAllUsersQuery()

  useEffect(() => {
    if (patientData) {
      setSenderID(patientData.id)
    }
  }, [patientData])
  const sendChat = async (senderID: string) => {
    const newSocket = io(`${process.env.EXPO_PUBLIC_IP_ADDR}`, {
      path: '/api/notify/socket.io',
      transports: ['websocket']
    })

    // logged in user is the senderID --> userID <===> senderID
    // patientID is the active chat ID/ the receiver === currentChat?.receiver?.id

    const message = {
      text,
      senderID: userID,
      patientID: activeChat?.receiver?.id,
      id: uuidv4(),
      chatID: activeChat?.chat?.id
      // recentChatID,
    }

    setRecentChats((prev) => [...prev, message])

    newSocket.emit('sendMessage', message)
    newSocket.emit('newChat', message)

    // console.log(chatID, 'lpiou')

    // console.log(messageData,'klip')
    // await addChats({
    //   id1: patientID,
    //   id2: receiverID,
    //   text,
    // });

    //   if(messageData?.length === 0 || messageData?.length === undefined){
    //       await addChats({
    //         id1:patientID,
    //         id2:receiverID,
    //         text,
    //       });

    //  console.log('new mess cat!!')
    //   }else{
    //   console.log('new mess!!', messageData?.length)

    //   }

    //
  }

  // console.log(usersChat, 'chats')

  // useEffect(() => {
  //   (async () => {
  //     if (currentChat) {
  //       const data = await fetchMessage(currentChat?.chat?.id)
  //       setMessages(data)
  //     }
  //   })()
  // }, [currentChat])
  return (
    <div className="p-4 bg-white">
      <div className="flex flex-row h-screen">
        <ChatList data={chats} handleChatChange={setActiveChat} />

        {/*  */}

        <div className="w-3/4 flex flex-col h-screen">
          <MessageArea data={messages} />
          <ChatInput
            chatID={activeChat?.chat?.id}
            patientID={activeChat?.receiver?.id}
            senderID={senderID}
            text={text}
            setText={setText}
          />
        </div>
      </div>
    </div>
  )
}
