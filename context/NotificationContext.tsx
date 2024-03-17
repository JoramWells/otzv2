/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { createContext, useContext, useState } from 'react'

export interface NotificationProps {
  id: string
  message: string
}

export interface NotificationContextTypeProps {
  notifications: NotificationProps[]
  addNotification: (notification: NotificationProps) => void
}

export const NotificationContext = createContext<NotificationContextTypeProps>({
  notifications: [],
  addNotification: () => {}
})

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([])

  const addNotification = (notification: NotificationProps) => {
    setNotifications((prevNotification) => [...prevNotification, notification])
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationContext = () => useContext(NotificationContext)
