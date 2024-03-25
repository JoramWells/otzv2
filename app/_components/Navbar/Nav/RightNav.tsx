// 'use client'

import { Bell, CircleUserRound, MessageSquareText } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import useNotification from '@/hooks/useNotification'
import socketIOClient, { type Socket } from 'socket.io-client'
import { NotificationContext, type NotificationProps } from '@/context/NotificationContext'
import { UserMenuDropDown } from './UserMenuDropDown'

const RightNav = () => {
  const router = useRouter()
  const { notifications, addNotification } = useContext(NotificationContext)

  const showNotification = useNotification()

  useEffect(() => {
    const socket: Socket = socketIOClient('/api/root-service/')

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
      className='flex flex-row space-x-6'
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
        {/* <CircleUserRound
          className="text-slate-500 hover:cursor-pointer hover:text-slate-600"
          size={24}
          onClick={() => {
            router.push('/login')
          }}
        /> */}
        <UserMenuDropDown />
      </div>
  )
}

export default RightNav
