import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import marker icons correctly for Vite/React
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Bangladesh boundaries
const bangladeshBounds = [
  [20.5, 88.0], // southwest
  [26.8, 92.7], // northeast
];

// ✅ Your JSON dataset (sample with 2 regions, add all later)
const districtsData = [
  {
    region: "Dhaka",
    district: "Dhaka",
    city: "Dhaka",
    covered_area: ["Mirpur", "Dhanmondi", "Gulshan"],
    latitude: 23.8103,
    longitude: 90.4125,
    status: "active",
    flowchart: "https://example.com/dhaka-flowchart",
  },
  {
    region: "Chittagong",
    district: "Chittagong",
    city: "Chittagong",
    covered_area: ["Agrabad", "Pahartali", "Panchlaish"],
    latitude: 22.3569,
    longitude: 91.7832,
    status: "active",
    flowchart: "https://example.com/chittagong-flowchart",
  },
  {
    region: "Khulna",
    district: "Khulna",
    city: "Khulna",
    covered_area: ["Sonadanga", "Khalishpur"],
    latitude: 22.8456,
    longitude: 89.5403,
    status: "inactive",
    flowchart: "https://example.com/khulna-flowchart",
  },
  // 👉 Add all 64 districts here
];

const Coverage = () => {
  const [search, setSearch] = useState("");

  // Filter districts based on search input
  const filteredDistricts = districtsData.filter(
    (d) =>
      d.district.toLowerCase().includes(search.toLowerCase()) ||
      d.city.toLowerCase().includes(search.toLowerCase()) ||
      d.covered_area.some((area) =>
        area.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className="p-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">
        We are available in <span className="text-green-600">64 districts</span>
      </h1>

      {/* Search Box */}
      <div className="flex justify-center mb-6">
        <div className="join">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search districts, city, or area..."
            className="input input-bordered join-item w-80"
          />
          <button className="btn bg-lime-400 join-item">Search</button>
        </div>
      </div>

      {/* Map */}
      <div className="flex justify-center">
        <MapContainer
          center={[23.685, 90.3563]} // Centered on Bangladesh
          zoom={7}
          maxBounds={bangladeshBounds}
          style={{ height: "500px", width: "90%", borderRadius: "12px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Markers */}
          {filteredDistricts.map((district, index) => (
            <Marker
              key={index}
              position={[district.latitude, district.longitude]}
            >
              <Popup>
                <div className="space-y-2">
                  <h2 className="font-bold text-lg">{district.district}</h2>
                  <p>
                    <span className="font-semibold">Region:</span>{" "}
                    {district.region}
                  </p>
                  <p>
                    <span className="font-semibold">City:</span> {district.city}
                  </p>
                  <p>
                    <span className="font-semibold">Covered Areas:</span>{" "}
                    {district.covered_area.join(", ")}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={`${
                        district.status === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      } font-bold`}
                    >
                      {district.status}
                    </span>
                  </p>
                  <a
                    href={district.flowchart}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Flowchart
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
