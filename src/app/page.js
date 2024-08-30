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
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  const handleToggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
    document.body.style.backgroundColor = newTheme === "dark" ? "#1f2937" : "aliceblue";
    localStorage.setItem('theme', newTheme);
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div style={{ height: '100vh' }}>
      <nav className={`nav ${isDarkMode ? 'bg-gray-900 text-white' : 'text-black'}`}
        style={{ backgroundColor: isDarkMode ? 'rgb(17 24 39 / var(--tw-bg-opacity))' : 'skyblue' }}>
        <h1 className="text-3xl font-bold m-2">Antipode Explorer</h1>
        <button
          onClick={handleToggleDarkMode}
          className="m-2 px-4 py-2 border rounded-md bg-gray-800 text-white dark:bg-gray-200 dark:text-black"
        >
          {isDarkMode ? (
            <img src="/sun.png" alt="Light Mode" width="20" height="20" />
          ) : (
            <img src="/moon.png" alt="Dark Mode" width="20" height="20"
              style={{}} />
          )}
        </button>
      </nav>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>

        <div className="introduction-container mx-auto max-w-4xl p-8 text-center">
          <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>
            Welcome to the Antipode Explorer
          </h2>
          <p className={`text-lg mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
            Have you ever wondered what lies directly on the other side of the Earth? This is the exact question that our app,
            <strong> Antipode Explorer</strong>, seeks to answer! An "antipode" refers to the point on the Earth's surface that is
            diametrically opposite to another location. If you were to draw a straight line from your current location through the
            center of the Earth, you'd end up at your antipode. Our app helps you discover the precise spot on the globe where you'd
            emerge if you tunneled straight through the Earth!
          </p>
          <p className={`text-lg mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
            Simply click anywhere on the map <b><a href="#anti-map">below</a></b>, and we'll take you to the corresponding antipode location. You can even switch back and
            forth between the original spot and its antipode. Whether you're just curious, exploring for fun, or trying to learn more
            about geography, this tool is here to help.
          </p>
          <p className={`text-lg mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
            <strong> Please note: The map is currently in developer mode and will be updated soon after I resolve some bank-related issues.</strong>
          </p>
          <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-800"}`} id="anti-map">
            Thank you for your understanding and patience as we continue to improve the app. Feel free to explore and check back soon
            for updates!
          </p>
        </div>



        <div style={{}}>
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
          {selectedLocation && (
            <button
              onClick={goToAntipode}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 transition-colors duration-300"
            >
              Go to Antipode
            </button>
          )}
          {selectedLocation && (
            <button
              onClick={goBackToMarker}
              className="px-6 py-2 ml-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:ring focus:ring-gray-300 transition-colors duration-300"
            >
              Go Back
            </button>
          )}
        </div>
        <br></br>
        <br></br>
      </div>

      <footer>
        <p>
          &copy; 2024
          <a href="https://aurelio-miranda.netlify.app/" target="_blank" rel="noopener noreferrer"> Aurélio Miranda</a>
          . All rights reserved.
        </p>
        <div>
          <a href="https://www.instagram.com/l_aurelio_l/" target="_blank" rel="noopener noreferrer">
            <img maw={240} width="25" height="25"
              src="https://www.iconpacks.net/icons/2/free-instagram-logo-icon-3497-thumb.png"
              alt="Instagram" />
          </a>
          <a href="https://www.linkedin.com/in/mirandex/" target="_blank" rel="noopener noreferrer">
            <img maw={240} width="25" height="25"
              src="https://cdn-icons-png.flaticon.com/512/61/61109.png"
              alt="LinkedIn" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100008999912309" target="_blank" rel="noopener noreferrer">
            <img maw={240} width="25" height="25"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Facebook%2BIcon%2BBlack.png"
              alt="Facebook" />
          </a>
          <a href="mailto:aureliogaboleiro49@gmail.com">
            <img maw={240} width="25" height="auto"
              src="https://www.pngmart.com/files/15/Email-Symbol-PNG-Transparent.png"
              alt="Email" />
          </a>
        </div>
      </footer>
    </div>
  );
}
