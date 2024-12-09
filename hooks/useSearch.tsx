import { type Dispatch, type SetStateAction, useEffect, useMemo } from 'react'
import debounce from 'lodash/debounce'
interface UseSearchInputProps {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

const useSearch = ({ search, setSearch }: UseSearchInputProps) => {
  const debounceSearch = useMemo(() => {
    // setSearch(value)

    return debounce(async (value: string) => {
      setSearch(value)
    }, 500)
  }, [setSearch])

  useEffect(() => {
    debounceSearch?.(search)
    return () => debounceSearch?.cancel()
  }, [debounceSearch, search])
}

export default useSearch
