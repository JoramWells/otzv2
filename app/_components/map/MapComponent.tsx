/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable multiline-ternary */
import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

interface MapProps {
  center?: google.maps.LatLngLiteral
}

const containerStyle = {
  width: '250px',
  height: '150px',
  borderRadius: '10px'
}

const MapComponent: React.FC<MapProps> = ({ center }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDSg2RZcb6i3EohltpyGWSd4GGnfWpA4bQ'
  })
  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  const onLoad = React.useCallback(function callback (map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [center])

  const onUnmount = React.useCallback(function callback () {
    setMap(null)
  }, [])
  return isLoaded ? (

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
  ) : (
    <></>
  )
}

export default MapComponent
