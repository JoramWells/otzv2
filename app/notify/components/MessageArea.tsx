import React from 'react'

const MessageArea = ({ data }) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className='flex-1 p-4 overflow-y-auto' >
        {data?.map((item) => (
          <div key={item.id} className='mb-2' >{item?.text}</div>
        ))}
      </div>
    </div>
  )
}

export default MessageArea
