'use client'

import PageTableContainer from '@/app/_components/table/PageTableContainer'
import React, { useState } from 'react'
import { transferOutColumns } from '../columns'
import { useGetAllTransferOutsQuery } from '@/api/users/transfer/transferOut.api'
import usePreprocessData from '@/hooks/usePreprocessData'
import useSearch from '@/hooks/useSearch'

const TransferOut = ({ hospitalID }: { hospitalID: string }) => {
  const [search, setSearch] = useState('')

  const { data: transferOutData, isLoading } = useGetAllTransferOutsQuery(
    {
      hospitalID,
      page: 1,
      pageSize: 10,
      searchQuery: search
    },
    {
      skip: hospitalID == null
    }
  )
  const { data, total } = usePreprocessData(transferOutData)
  useSearch({ search, setSearch })

  return (
    <PageTableContainer
      columns={transferOutColumns}
      data={data}
      total={total as number}
      isLoading={isLoading}
      search={search}
      setSearch={setSearch}
      title="Transfer Outs"
    />
  )
}

export default TransferOut
