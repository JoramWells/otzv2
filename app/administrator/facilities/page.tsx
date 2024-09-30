'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const Facilities = () => {
  const router = useRouter()
  return (
    <div>
        <Button
        onClick={() => { router.push('/administrator/add-facility') }}
        >
            New
        </Button>
    </div>
  )
}

export default Facilities
