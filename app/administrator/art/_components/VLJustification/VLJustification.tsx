import { useGetAllVlJustificationQuery } from '@/api/viraload/vlJustification.api'
import React from 'react'
import AddVLJustification from '../add-vl-justification/AddVLJustification'

const VLJustification = () => {
    const {data} = useGetAllVlJustificationQuery()
    console.log(data, 'datam')
  return (
    <div>VLJustification

        <AddVLJustification />
    </div>
  )
}

export default VLJustification