import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import React from 'react'

const TableSkeleton = ({ isSearch = false }: { isSearch?: boolean }) => {
  return (
    <>
      {isSearch && (
        <div
        className='p-2 w-1/4'
        >
          <Skeleton className="p-4" />
        </div>
      )}
      <Table>
        <TableBody>
          {Array.from({ length: 10 }).map((item, i) => (
            <TableRow key={i}>
              {Array.from({ length: 10 }).map((item, i) => (
                <TableCell key={i}>
                  <Skeleton className="p-2" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default TableSkeleton
