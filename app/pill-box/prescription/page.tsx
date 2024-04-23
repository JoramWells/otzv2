/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from './columns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import useNotification from '@/hooks/useNotification'
import { type NotificationProps } from '@/context/NotificationContext'
import socketIOClient, { type Socket } from 'socket.io-client'
import { useSearchParams } from 'next/navigation'
import { PlusCircle } from 'lucide-react'
import { useGetAllPrescriptionsQuery } from '@/api/pillbox/artPrescription.api'

const PrescriptionPage = () => {
  const { data } = useGetAllPrescriptionsQuery()


  console.log(data, 'yu')

  const showNotification = useNotification()



  useEffect(() => {
    // if (data) {
    // setAppointments(data)
    // }
    const socket: Socket = socketIOClient('http://localhost:5000')

    socket.on('appointment-updated', (socketData: NotificationProps) => {
      showNotification()
      // setAppointments(socketData)
      console.log(socketData)
    })

    return () => {
      socket.disconnect()
    }
  }, [data, showNotification])

  return (
    <div className="p-5 mt-12">
      <div className="flex flex-row mb-4 justify-between ">
        <h1 className="text-xl text-slate-700 font-semibold">Prescriptions</h1>
      </div>

      <CustomTable columns={columns} data={data || []}  />
    </div>
  );
}

export default PrescriptionPage
