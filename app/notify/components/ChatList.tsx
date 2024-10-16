import React from 'react'

const ChatList = ({ data, handleChatChange }) => {
  return (
    <div className="w-1/4 border border-r border-slate-300">
      {data?.map((item, idx) => (
        <div
        className='border-slate-200 rounded-lg hover:bg-slate-200  cursor-pointer p-2 pl-4 pr-4'
        key={idx} onClick={() => handleChatChange(item)}>
          <p
          className='font-bold text-[14px]'
          >{item?.receiver?.firstName}</p>
          <p
          className='text-sm text-slate-500'
          >
            {item?.chat?.Messages[0]?.text}
          </p>
        </div>
      ))}
    </div>
  )
}

export default ChatList
