/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useCallback, useEffect, useState } from 'react'

export interface CurrentLocationProps {
  lat: number
  lng: number
}

const useCurrentLocation = () => {
  const [location, setLocation] = useState<CurrentLocationProps | null>(null)

  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          setLocation({ lat: latitude, lng: longitude })
        },
        error => {
          console.error('Error getting user location:', error)
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser')
    }
  }, [])

  useEffect(() => {
    getCurrentLocation()
  }, [getCurrentLocation])

  return location
}

export default useCurrentLocation
