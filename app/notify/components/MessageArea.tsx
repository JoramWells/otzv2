import Image from 'next/image'
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
            {item.type === 'text' && item?.text}
            {item.type === 'image' && (
              <Image
                // w={0}
                alt="im"
                // placeholder="data:image/..."
                width={200}
                height={150}
                // quality={200}
                // fill
                // objectFit='contain'
                // priority
                className="border bg-slate-200 rounded-lg"
                src={`${process.env.NEXT_PUBLIC_API_URL}/api/notify/${item.filePath}`}
                style={{
                  width: '200px',
                  height: '150px',
                  objectFit: 'cover'
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div ref={lastMessageRef} />
    </div>
  )
}

export default MessageArea
