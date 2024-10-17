import { type MessagesAttributes } from 'otz-types'
import React, { type RefObject } from 'react'

const MessageArea = ({
  data,
  lastMessageRef
}: {
  data: MessagesAttributes[] | undefined
  lastMessageRef: RefObject<HTMLDivElement>
}) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex-1 p-4 overflow-y-auto">
        {data?.map((item) => (
          <div key={item.id} className="mb-2">
            {item?.text}
          </div>
        ))}
      </div>
      <div ref={lastMessageRef} />
    </div>
  )
}

export default MessageArea
