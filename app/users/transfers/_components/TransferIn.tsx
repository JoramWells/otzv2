import { useGetAllTransferInsQuery } from '@/api/users/transfer/transferIn.api'
import PageTableContainer from '@/app/_components/table/PageTableContainer'
import React, { useState } from 'react'
import { transferInColumns } from '../columns'
import usePreprocessData from '@/hooks/usePreprocessData'
import useSearch from '@/hooks/useSearch'

const TransferIn = ({ hospitalID, userID }: { hospitalID: string, userID: string }) => {
  const [search, setSearch] = useState('')

  const { data: transferInData, isLoading } = useGetAllTransferInsQuery(
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

  const { data, total } = usePreprocessData(transferInData)
  useSearch({ search, setSearch })
  return (
    <PageTableContainer
    columns={transferInColumns(hospitalID, userID)}
    data={data}
    total={total as number}
    title='Transfer In'
    search={search}
    setSearch={setSearch}
    isLoading={isLoading}
    />
  )
}

export default TransferIn
