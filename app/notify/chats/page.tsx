/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'

import { useAddChatsMutation, useGetChatQuery } from '@/api/notifications/chat.api'
import { useGetChatMessageQuery } from '@/api/notifications/chatMessage.api'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
// import { type Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect } from 'react'

export default function Page () {
  const [addChats, { isLoading }] = useAddChatsMutation()
  // const {} = useGetChatQuery()
  const { data: session } = useSession()

  const userID = session?.user?.id

  const { data: usersData } = useGetAllUsersQuery()

  const { data: usersChat } = useGetChatQuery(session?.user?.id)

  const { data: messageData } = useGetChatMessageQuery(userID)

  const pChats = useCallback(() => {
    return usersData?.filter((user: any) => {
      if (userID && userID === user.id) return false

      const isChatCreated = usersChat?.some((chat: any) => {
        const xcf = chat.members[0] === user.id || chat.members[1] === user.id

        return xcf
      })

      return isChatCreated
    }) || []
  }, [usersData, userID, usersChat])

  // const createChats = useCallback((id1, id2) => {
  //   const respo
  // }, [])

  useEffect(() => {
    pChats()
    // filterUsers()
  }, [pChats])

  console.log(messageData, 'chats')
  return (
    <div className="p-4 mt-14">
      <div className="flex flex-row space-x-2">
        {usersData?.map((item: any) => (
          <div key={item.id}>
            <Button
              onClick={() =>
                addChats({
                  id1: userID,
                  id2: item.id
                })
              }
            >
              {isLoading && <Loader2 className="mr-2 animate-spin" />}
              {item.firstName}
            </Button>
          </div>
        ))}
      </div>

      {/*  */}
      <div>
        {pChats()?.map((item: any) => (
          <div key={item.id}>{item.firstName}</div>
        ))}
      </div>
      <div>{messageData ? 'Available' : 'No Text'}</div>
    </div>
  )
}
