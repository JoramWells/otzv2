'use client'

import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const RowDetails = ({ link }: { link: string }) => {
  const router = useRouter()
  return (
    <ArrowRight
      size={18}
      className="hover:cursor-pointer hover:text-slate-500 text-slate-400 "
      onClick={() => {
        router.push(
          link
        )
      }}
    />
  )
}

export default RowDetails
