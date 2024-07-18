/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useGetETLQuery } from '@/api/etl/etl.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { type ColumnDef } from '@tanstack/react-table'
import Papa, { type ParseMeta } from 'papaparse'

import React, { useEffect, useMemo, useState } from 'react'

type CsvRow = Record<string, string>

interface ParseResult<T> {
  data: T[]
  errors: ParseError[]
  meta: ParseMeta
}

interface ParseError {
  type: string
  code: string
  message: string
  row?: number
}

const DatabaseDetail = ({ params }: any) => {
  const databaseID = params.databaseID
  const { data } = useGetETLQuery(databaseID)

  const [csvArray, setCSVArray] = useState<CsvRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [headers, setHeaders] = useState<string[]>([])

  const columns = useMemo<Array<ColumnDef<any>>>(
    () =>
      headers.map((header) => ({
        accessorKey: header,
        header
      })),
    [headers]
  )

  useEffect(() => {
    if (data?.file) {
      const fetchCSV = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/etl/media/${data?.file}`
        await fetch(url)
          .then(async (res) => await res.text())
          .then((csvText) => {
            Papa.parse(csvText, {
              header: true,
              skipEmptyLines: true,
              complete: (res: ParseResult<CsvRow>) => {
                if (res.errors.length > 0) {
                  setError(res.errors.map((e) => e.message).join(', '))
                } else {
                  setError(null)
                  setCSVArray(res.data)
                  setHeaders(res.meta.fields ?? [])
                }
              }
            })
          })
      }

      void fetchCSV()
    }
  }, [data])

  console.log(csvArray, 'klo')
  console.log(error, 'error')
  // console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/etl/media/${data?.file}`, 'klo')

  return (
    <div>
      {csvArray.length > 0 && (
        <>
          <div className="p-4">
            <div className="bg-white rounded-lg p-4">
              <CustomTable columns={columns} data={csvArray || []} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default DatabaseDetail
