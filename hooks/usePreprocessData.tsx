import { type PaginatedResponseInterface } from 'otz-types'
import { useEffect, useState } from 'react'

const usePreprocessData = (responseData?: PaginatedResponseInterface<any> | null) => {
  const [data, setData] = useState<any[]>([])
  const [total, setTotal] = useState<string | number | undefined>(0)
  useEffect(() => {
    if (responseData != null) {
      setData(responseData.data)
      setTotal(responseData?.total)
    }
  }, [responseData])
  return { data, total }
}

export default usePreprocessData
