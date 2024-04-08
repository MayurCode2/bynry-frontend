// UserCard.js
import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import defaultImg from "../assets/bussiness.png"

const UserCard = ({ user }) => {
 const [showModal, setShowModal] = useState(false);
 const [showMap, setShowMap] = useState(false);
 const [viewport, setViewport] = useState({
    latitude: parseFloat(user.contact.address.lat),
    longitude: parseFloat(user.contact.address.lng),
    zoom: 10,
    width: '100%',
    height: '400px',
 });

 const handleShowModal = () => {
    setShowModal(true);
 };

 const handleCloseModal = () => {
    setShowModal(false);
 };

 const handleShowMap = () => {
    setShowMap(true);
 };

 const handleCloseMap = () => {
    setShowMap(false);
 };

 const hasLocation = user.contact.address.lat && user.contact.address.lng;

 return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <img src={user.profilePicture || defaultImg} alt={user.name} className="w-20 h-20 rounded-full mx-auto" />
      <div className="text-center mt-4">
        <p className="text-lg font-semibold">{user.name}</p>
        <p className="text-gray-500">{user.email}</p>
        <div className="flex justify-between mt-4">
          <button className="bg-blue-500 text-white text-sm px-2 py-1 rounded mr-2" onClick={handleShowModal}>
            Show More
          </button>
          <button className="bg-green-500 text-white px-2 py-2 text-sm rounded mr-2" onClick={handleShowMap}>
            Location
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <p className="text-lg font-semibold mb-4">User Details</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Contact Number: {user.contact.phoneNumber}</p>
          <p>Address: {user.contact.address.street}, {user.contact.address.city}, {user.contact.address.state}, {user.contact.address.zip}, {user.contact.address.country}</p>
          <button className="bg-red-500 text-white px-4 py-2 rounded mt-4" onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </div>
    
      )}

      {showMap && hasLocation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <p className="text-lg font-semibold mb-4">User Location</p>
            <ReactMapGL
              {...viewport}
              mapboxApiAccessToken="YOUR_MAPBOX_ACCESS_TOKEN" // Replace with your Mapbox access token
              onViewportChange={(nextViewport) => setViewport(nextViewport)}
              mapStyle="mapbox://styles/mapbox/streets-v11"
            >
              <Marker
                latitude={parseFloat(user.contact.address.lat)}
                longitude={parseFloat(user.contact.address.lng)}
              >
                <div className="marker">📍</div>
              </Marker>
            </ReactMapGL>
            <button className="bg-red-500 text-white px-4 py-2 rounded mt-4" onClick={handleCloseMap}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
 );
};

export default UserCard;
