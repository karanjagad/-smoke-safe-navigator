import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup ,Circle} from "react-leaflet";
import "./styles.css";
import "leaflet/dist/leaflet.css";


function App() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch('https://overpass-api.de/api/interpreter?data=[out:json];(node["amenity"="school"](50.0,7.0,51.0,8.0);node["amenity"="kindergarten"](50.0,7.0,51.0,8.0);node["leisure"="playground"](50.0,7.0,51.0,8.0);node["leisure"="sports_centre"](50.0,7.0,51.0,8.0);node["leisure"="grundschule"](50.0,7.0,51.0,8.0););out;')
      .then(response => response.json())
      .then(data => {
        // Filter out schools without coordinates
        const filteredSchools = data.elements.filter(school => school.lat && school.lon);
        setSchools(filteredSchools);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <MapContainer center={[50.3569, 7.5890]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {schools.map((school, index) => (
        <Marker key={index} position={[school.lat, school.lon]}>
          <Popup>{school.tags.name || 'A school'}</Popup>
          <Circle center={[school.lat, school.lon]} radius={100} color="red" />
        </Marker>
      ))}
    </MapContainer>
  );
}

export default App;
