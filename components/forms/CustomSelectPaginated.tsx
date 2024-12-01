/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { type UserInterface } from 'otz-types'
import React, { useEffect, useRef, useState } from 'react'
export interface DataItem {
  id: string
  label: string
}

export interface SelectProps {
  label?: string
  description?: string
  value: string
  placeholder?: string
  defaultValue?: string
  name?: string
  onChange: (value: any) => void
  data: DataItem[]
  user: UserInterface
}

const CustomSelectPaginated = ({
  label = '',
  placeholder = '',
  data = [],
  onChange,
  value,
  description,
  name,
  defaultValue,
  user
}: SelectProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const selectRef = useRef<HTMLDivElement | null>(null)
  const fetchProjects = async ({ pageParam = 0 }) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/users/fetchAll`,
      {
        params: {
          hospitalID: user?.hospitalID as string,

          page: pageParam,
          pageSize: 10, // Adjust page size as needed
          search: searchQuery
        }
      }
    )
    return res.data
  }
  const {
    data: scrollData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ? lastPage.page : undefined // Ensure the server provides a `nextPage` key
    }
  })

  const options =
    scrollData?.pages?.[0]?.data?.map((page) => ({
      id: page.id,
      label: `${page.firstName} ${page.firstName}`
    })) ?? []

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    console.log('scroll')
    const position = e.currentTarget.scrollHeight - e.currentTarget.scrollTop <= e.currentTarget.clientHeight
    if (position && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  useEffect(() => {
    const dropdown = selectRef.current

    if (dropdown) {
      dropdown.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (dropdown) {
        dropdown.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div className="w-full flex space-y-2 flex-col">
      <div>
        {label && (
          <p className="font-semibold text-slate-700 capitalize text-[14px] ">
            {label}
          </p>
        )}

        {description && (
          <p className=" text-[12px] text-muted-foreground">{description}</p>
        )}
      </div>

      <Select
        onValueChange={(e) => {
          onChange(e)
        }}
        value={value}
        name={name}
      >
        <SelectTrigger className="w-full shadow-none border-slate-200 p-4 rounded">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent ref={selectRef} className="shadow-none h-[200px]" onScroll={handleScroll}>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.label}
            </SelectItem>
          ))}
          {isFetchingNextPage && <p>Loading more...</p>}
          {!hasNextPage && <p>No more options</p>}
        </SelectContent>
      </Select>
    </div>
  )
}

export default CustomSelectPaginated
