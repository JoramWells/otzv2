import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer
      className=" p-2 pr-4 mt-auto  w-full text-center bg-white h-[50px]
    flex  items-center justify-between border-t border-slate-200 flex-row
    "
    >
      <Image
        src={'/img/chap.png'}
        alt="img"
        width={80}
        height={40}
        style={{ width: '80px', height: '40px' }}
        objectFit="cover"
        quality={80}
      />
      <p className="text-slate-700 text-[12px]">Powered by ADG</p>
      <p className="text-[12px] text-slate-500">
        Copyright @2024 . Terms and Conditions
      </p>
    </footer>
  )
}

export default Footer
