/* eslint-disable @typescript-eslint/no-floating-promises */
import { useCallback, useEffect, useState } from 'react'

type NotificationPermission = 'default' | 'denied' | 'granted'

const useNotification = () => {
  const notificationAudio = useCallback(() => new Audio('/audio/message-tone-checked-off.mp3'), [])

  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default')

  const showNotification = useCallback(() => {
    if (notificationPermission === 'granted') {
      const notification = new Notification('Hello from appointments', {
        body: 'Please take your medicines'
      })
      //   notificationAudio().play()

      const audio = notificationAudio()

      audio.play().catch(err => {
        console.log(err)
      })

      setTimeout(() => {
        notification.close()
        audio.pause()
      }, 3000)
    }
  }, [notificationPermission, notificationAudio])

  const requestNotification = async () => {
    if ('Notification' in window) {
      try {
        await Notification.requestPermission().then((permission) => {
          setNotificationPermission(permission)
        })
      } catch (error) {
        setNotificationPermission('denied')
      }
    }
  }

  useEffect(() => {
    requestNotification()
  }, [])

  return showNotification
}

export default useNotification
