'use client'
import { Bell, CircleUserRound, MessageSquareText } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useNotification from '@/hooks/useNotification'
import socketIOClient, { type Socket } from 'socket.io-client'
import { useContext, useEffect } from 'react'
import { NotificationContext, type NotificationProps } from '@/context/NotificationContext'

const Navbar = () => {
  const { notifications, addNotification } = useContext(NotificationContext)
  const router = useRouter()

  const showNotification = useNotification()

  useEffect(() => {
    const socket: Socket = socketIOClient('http://localhost:5000')

    socket.on('lab-updated', (socketData: NotificationProps) => {
      showNotification()
      addNotification(socketData)
      console.log(notifications)
    })

    return () => {
      socket.disconnect()
    }
  }, [showNotification, notifications, addNotification])

  return (
      <div
        className="fixed
    w-full h-12 flex items-center justify-end
    border-b border-gray-200 z-10 bg-white p-2 space-x-4
    "
      >
        <div className="relative">
          <Bell
            className="text-slate-500 hover:cursor-pointer hover:text-slate-600"
            size={24}
            onClick={() => {
              router.push('/notification')
            }}
          />
          <div
            className="absolute bg-red-500 top-0 right-0
        h-4 w-4 rounded-full text-sm flex
        "
          >
            {[].length}
          </div>
        </div>
        <MessageSquareText
          className="text-slate-500 hover:cursor-pointer hover:text-slate-600"
          size={24}
        />
        <CircleUserRound
          className="text-slate-500 hover:cursor-pointer hover:text-slate-600"
          size={24}
          onClick={() => { router.push('/auth/login') }}
        />
      </div>
  )
}

export default Navbar
