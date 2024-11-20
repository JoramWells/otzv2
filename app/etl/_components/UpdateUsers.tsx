/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useAddUserMutation } from '@/api/users/users.api'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { CircleCheck, Loader2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type UserInterface } from 'otz-types'
import React, { useCallback, useEffect, useState } from 'react'
interface CheckUserInterface {
  user: string
  exists: boolean
}

interface UpdateUsersProfile {
  users: CheckUserInterface[]
  hospitalID?: string
}

const UpdateUsers = ({
  users,
  hospitalID

}: UpdateUsersProfile) => {
  const [recentUser, setRecentUser] = useState<UserInterface>()
  const router = useRouter()
  const [addUser, { isLoading, data: savedUserData }] = useAddUserMutation()

  const { toast } = useToast()

  const send = useCallback(
    (username: string) =>
      toast({
        // variant:'success',
        title: 'Completed',
        description: `Successfully added ${username}`
        // action: <ToastAction altText="Saved">Undo</ToastAction>
      }),
    [toast]
  )

  const [localUsers, setLocalUsers] = useState(users) // Local state for users

  useEffect(() => {
    if (savedUserData) {
      setRecentUser(savedUserData as UserInterface)
      const userName = `${savedUserData.firstName} ${savedUserData.middleName}`
      send(userName)
      setLocalUsers((prev) =>
        prev.map((u) =>
          u.user.trim().toLowerCase() === userName.trim().toLowerCase()
            ? { ...u, exists: true }
            : u
        )
      )
    }

    //
  }, [savedUserData, send])

  return (
    <div className="flex items-center justify-center relative w-full bg-black/[.3] h-[100vh]">
      <div className="flex flex-col space-y-2 bg-white w-1/2 shadow-lg rounded-lg p-4">
        <div>
          <p>Users </p>
          <p className="text-muted-foreground text-[12px]">
            The following list of {users?.length} users need to be registered.
          </p>
        </div>
        {localUsers.map((item, idx) => (
          <div key={item.user} className="flex space-x-2 items-center">
            <p>{idx + 1}.</p>
            <div className="flex flex-1 justify-between items-center border h-10 rounded-lg border-slate-200 p-2">
              <p className="text-[12px] font-bold">{item.user}</p>
              <div className="flex items-center space-x-2 w-1/2 justify-between">
                {item.exists ||
                `${recentUser?.firstName} ${recentUser?.middleName}`
                  .trim()
                  .toLowerCase() === item.user.trim().toLowerCase()
                  ? (
                  <div className="flex items-center space-x-2 text-emerald-500 text-[12px] ">
                    <CircleCheck size={16} />
                    <p>Registered</p>
                  </div>
                    )
                  : (
                  <div className="flex items-center space-x-2 text-red-500 text-[12px] ">
                    <X className="" size={16} />
                    <p>Not Registered</p>
                  </div>
                    )}
                {!item.exists && (
                  <Button
                    size={'sm'}
                    disabled={isLoading}
                    onClick={async () => {
                      const reverseName = (name: string) => {
                        const parts = name.trim().split(' ')
                        const reversed = parts.reverse()
                        return {
                          reversedName: reversed.join(' '),
                          firstName: reversed[1] || '',
                          lastName: reversed[0] || ''
                        }
                      }

                      const { firstName, lastName } = reverseName(item.user)

                      await addUser({
                        firstName,
                        middleName: lastName,
                        hospitalID
                      })
                    }}
                  >
                    {isLoading && (
                      <Loader2 className="animate-spin" size={16} />
                    )}
                    {`${recentUser?.firstName} ${recentUser?.middleName}`
                      .trim()
                      .toLowerCase() === item.user.trim().toLowerCase()
                      ? 'Saved'
                      : 'Save'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
        <Button
          className="shadow-none absolute top-2 right-2 border-2 border-white hover:bg-slate-50 hover:text-slate-700 "
          variant={'ghost'}
          size={'sm'}
          onClick={() => {
            router.push('/etl')
          }}
        >
          <X className="text-white hover:text-slate-700" />
        </Button>
      </div>
    </div>
  )
}

export default UpdateUsers
