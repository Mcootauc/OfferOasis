import { React, useState } from 'react'
import { GoogleMap, InfoWindow, MarkerF, useJsApiLoader } from '@react-google-maps/api'

/**
 * Handles the creation of the map widget
 */

export function Maps({ offerTitle, latitude, longitude }) {
  const mapStyles = {
    height: '80vh',
    width: '100%'
  }

  const postLocation = {
    name: offerTitle,
    location: {
      lat: latitude,
      lng: longitude
    }
  }

  const [selected, setSelected] = useState({})

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDir8l1ZjtwZRcAn0hYD648siaUcXL6sqs',
    libraries: ['geometry', 'drawing']
  })

  function seletItem(item) {
    setSelected(item)
  }

  if (isLoaded) {
    return (
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={postLocation.location}>
        <MarkerF key={postLocation.name} position={postLocation.location} onClick={() => seletItem(postLocation)} />

        {selected.location && (
          <InfoWindow position={selected.location} clickable={true} onCloseClick={() => setSelected({})}>
            <p>{selected.name}</p>
          </InfoWindow>
        )}
      </GoogleMap>
    )
  } else {
    return <div></div>
  }
}
