/* eslint-disable multiline-ternary */
import React, {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { Input } from '../ui/input'
import debounce from 'lodash/debounce'

export interface SelectInputProps {
  id?: string
  label?: string
}

interface SearchInputDropDownProps {
  data: SelectInputProps[]
  search: SelectInputProps
  setSearch: Dispatch<SetStateAction<SelectInputProps>>
}

const SearchInputDropDown = ({
  data,
  search,
  setSearch
}: SearchInputDropDownProps) => {
  const dropDownRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  const debounceSearch = useMemo(() => {
    // setSearch(value)
    return debounce(async (value: SelectInputProps) => {
      setSearch(value)
    }, 500)
  }, [setSearch])

  useEffect(() => {
    debounceSearch?.(search)
    return () => debounceSearch?.cancel()
  }, [debounceSearch, search])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch?.({ label: value })
    // debounceSearch && debounceSearch(value)
  }

  useEffect(() => {
    const handleMouseClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current != null &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleMouseClickOutside)
    return () =>
      document.removeEventListener('mousedown', handleMouseClickOutside)
  }, [])
  return (
    <div className="relative w-full p-2" ref={dropDownRef}>
      <form action="">
        <label htmlFor="" className="text-slate-700 text-[14px] font-semibold ">
          Search user
        </label>
        <Input
          placeholder="Identify client..."
          className="shadow-none"
          value={search?.label}
          onChange={handleSearch}
          onFocus={() => setIsOpen(true)}
        />
        {isOpen && (
          <div className="absolute bg-white shadow-lg left-0 right-4 rounded-lg border max-h-[200px] overflow-y-auto border-slate-200 flex-1 w-full mt-1">
            {data?.length > 0 ? (
              <>
                {data?.map((item) => (
                  <div
                    key={item?.id}
                    className="p-2 hover:bg-slate-50 hover:cursor-pointer text-[12px]"
                    onClick={() => {
                      setIsOpen(false)
                      // setPatientID(item?.id as string)
                      setSearch({ id: item?.id, label: item?.label })
                    }}
                  >
                    {item?.label?.slice(0, 50)}
                  </div>
                ))}
              </>
            ) : (
              <div className="p-2">
                <p>No results</p>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  )
}

export default SearchInputDropDown
