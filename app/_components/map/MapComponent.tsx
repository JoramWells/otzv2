/* eslint-disable multiline-ternary */
import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
  width: '50%',
  height: '700px',
  borderRadius: '10px'
}

const center = {
  lat: -3.745,
  lng: -38.523
}

const MapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDSg2RZcb6i3EohltpyGWSd4GGnfWpA4bQ'
  })
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback (map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback (map) {
    setMap(null)
  }, [])
  return isLoaded ? (
    <div
    className='flex flex-row justify-center w-full mt-4'
    >
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
    </div>
  ) : (
    <></>
  )
}

export default MapComponent
