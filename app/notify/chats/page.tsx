'use client'

import { useGetChatQuery } from '@/api/notifications/chat.api'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

export default function Page () {
  const { data: session } = useSession()

  const userID = session?.user?.id

  useEffect(() => {

  }, [])
  const { data } = useGetChatQuery(session?.user?.id)
  console.log(data)
  return (
    <div>page</div>
  )
}
