"use client";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";

const mapContainerStyle = {
  width: "75vw",
  height: "60vh",
};

export default function Home() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [antipodeLocation, setAntipodeLocation] = useState(null);

  const onMapClick = (event) => {
    const location = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setSelectedLocation(location);
    setCenter(location);
  };

  const getAntipode = (lat, lng) => {
    const antipodeLat = -lat;
    const antipodeLng = lng > 0 ? lng - 180 : lng + 180;
    return { lat: antipodeLat, lng: antipodeLng };
  };

  const goToAntipode = () => {
    if (selectedLocation) {
      const antipode = getAntipode(selectedLocation.lat, selectedLocation.lng);
      setAntipodeLocation(antipode);
      setCenter(antipode);
    }
  };

  const goBackToMarker = () => {
    if (selectedLocation) {
      setCenter(selectedLocation);
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div style={{}}>


      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        <div style={{  }}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={3}
            center={center}
            onClick={onMapClick}
          >
            {selectedLocation && <Marker position={selectedLocation} />}
            {antipodeLocation && (
              <Marker
                position={antipodeLocation}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }}
              />
            )}
          </GoogleMap>
        </div>

        <div style={{ marginTop: '30px' }}>
          {selectedLocation && <button onClick={goToAntipode}>Go to Antipode</button>}
          {selectedLocation && (
            <button onClick={goBackToMarker} style={{ marginLeft: "10px" }}>
              Go Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
