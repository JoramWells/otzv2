/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAddChatMessagesMutation } from '@/api/notifications/chatMessage.api'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import React, { type FormEvent, useState, type Dispatch, type SetStateAction } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useChatSocket } from '@/context/ChatContext'
import axios from 'axios'
import { type TextChatInputProps } from '../chats/page'

interface ChatInputProps {
  text: TextChatInputProps
  patientID: string | undefined
  senderID: string
  chatID: string
  avatar: string | undefined
  userName: string | undefined
  setText: Dispatch<SetStateAction<TextChatInputProps>>
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/notify/messages/add`

const ChatInput = ({ text, setText, patientID, senderID, chatID, userName, avatar }: ChatInputProps) => {
  const [addChatMessages, { isLoading: isLoadingMessageChat, error }] =
    useAddChatMessagesMutation()
  const [file, setFile] = useState<File | undefined>()
  const { socket } = useChatSocket()

  console.log(error, 'errorx')
  const handleSubmit = async () => {
    // const newSocket = io(`${process.env.EXPO_PUBLIC_IP_ADDR}`, {
    //   path: '/api/notify/socket.io',
    //   transports: ['websocket']
    // })

    const message = {
      avatar: avatar ?? 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fmedia-placeholder&psig=AOvVaw29z6m69F8wFru23cBQeqJL&ust=1729320249080000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLi80Yuql4kDFQAAAAAdAAAAABAJ',
      text: text.content,
      src: text?.src,
      type: text.type,
      senderID,
      patientID,
      id: uuidv4(),
      chatID,
      userName
      // recentChatID,
    }

    socket?.emit('sendMessage', message)
    socket?.emit('newChat', message)
    setText({ type: 'image', content: '' })

    const formData = new FormData()

    formData.append('image', file ?? '')

    formData.append('type', text.type)
    formData.append('text', text.content)
    formData.append('senderID', senderID)
    formData.append('chatID', chatID)
    formData.append('id', uuidv4())
    // await addChatMessages(message)
    await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  const handleImageUpload = (e: FormEvent<HTMLFormElement>) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const imageData = reader.result
        setText({ type: 'image', content: '', src: imageData as string })
      }
      setText({ type: 'text', content: '' })

      reader.readAsDataURL(file)
    }
  }

  return (
      <div className="flex items-center p-2 space-x-2">
        <Textarea value={text.content} onChange={(e) => { setText({ type: 'text', content: e.target.value }) }} />
        <input type='file' name='file' onChange={e => { setFile(e.target.files?.[0]) }} />
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
