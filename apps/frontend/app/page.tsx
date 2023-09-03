'use client'
import React from 'react'
import GoogleMapReact from 'google-map-react'
import MyMarker from './components/MyMarker'

// const AnyReactComponent = ({ text }: { text: string }) => <div>{text}</div>

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 38,
      lng: 36
    },
    zoom: 11
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <MyMarker lat={38} lng={36} tooltip={'title'} />
      </GoogleMapReact>
    </div>
  )
}