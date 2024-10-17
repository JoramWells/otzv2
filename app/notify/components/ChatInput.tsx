/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAddChatMessagesMutation } from '@/api/notifications/chatMessage.api'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import React, { type Dispatch, type SetStateAction } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useChatSocket } from '@/context/ChatContext'

interface ChatInputProps {
  text: string
  patientID: string | undefined
  senderID: string
  chatID: string | undefined
  setText: Dispatch<SetStateAction<string>>
}

const ChatInput = ({ text, setText, patientID, senderID, chatID }: ChatInputProps) => {
  const [addChatMessages, { isLoading: isLoadingMessageChat, error }] =
    useAddChatMessagesMutation()

  const { socket } = useChatSocket()

  //   console.log(error, 'errorx')
  const handleSubmit = async () => {
    // const newSocket = io(`${process.env.EXPO_PUBLIC_IP_ADDR}`, {
    //   path: '/api/notify/socket.io',
    //   transports: ['websocket']
    // })

    const message = {
      text,
      senderID,
      patientID,
      id: uuidv4(),
      chatID
      // recentChatID,
    }

    socket?.emit('sendMessage', message)
    socket?.emit('newChat', message)
    setText('')
    // await addChatMessages(message)
  }

  return (
      <div className="flex items-center p-2 space-x-2">
        <Textarea value={text} onChange={(e) => { setText(e.target.value) }} />
        <Button
          onClick={handleSubmit}
        >
            {isLoadingMessageChat &&
            <Loader2 className='animate-spin mr-2' size={16} />
            }
          Send
        </Button>
      </div>
  )
}

export default ChatInput
