'use client'

import React from 'react'

const ViratrackDetails = ({ params }: { params: any }) => {
  const { viratrackID } = params
  return (
    <div>
        {viratrackID}
    </div>
  )
}

export default ViratrackDetails
