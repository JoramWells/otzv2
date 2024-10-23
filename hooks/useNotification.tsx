/* eslint-disable @typescript-eslint/no-floating-promises */
import { useCallback, useEffect, useState } from 'react'

type NotificationPermission = 'default' | 'denied' | 'granted'

const useNotification = () => {
  const notificationAudio = useCallback(() => new Audio('/audio/message-tone-checked-off.mp3'), [])

  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default')

  const showNotification = useCallback((patientName: string, id: string) => {
    if (notificationPermission === 'granted') {
      const notification = new Notification('Pill Confirmation', {
        body: `${patientName} successfully confirmed`
      })
      //   notificationAudio().play()

      notification.onclick = function (e) {
        e.preventDefault()
        window.open(
          `/pill-box/reminder/${id}`,
          '_blank'
        )
      }

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
