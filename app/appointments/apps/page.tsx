'use client'

import { Button } from '@/components/ui/button'
import React from 'react'

const handleAuth = () => {
  window.location.href = 'http://localhost:5005'
}

const Page = () => {
  return (
    <div className="p-2">
      <h1>Apps</h1>

      {/*  */}
      <h2>Most Popular</h2>
      <Button variant="outline"
      onClick={handleAuth}
      >Connect to calendar</Button>
      <div className="flex flex-row space-x-4">
        {['Google Calendar', 'Google Meet', 'Zoom'].map((item) => (
          <div key={item} className="border p-2 rounded-lg flex-1">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
