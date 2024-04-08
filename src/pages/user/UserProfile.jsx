// UserProfile.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, updateUserProfile, uploadProfilePicture } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import defaultImg from "../../assets/bussiness.png"

const UserProfile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.userProfile);
  const userId = JSON.parse(localStorage.getItem('user'))._id;

  useEffect(() => {
    dispatch(getUserById(userId));
  }, [dispatch, userId]);

  const [editMode, setEditMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    dateOfBirth: '',
    gender: '',
    bio: '',
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        email: userProfile.email || '',
        contactNumber: userProfile.contact?.phoneNumber || '',
        street: userProfile.contact?.address?.street || '',
        city: userProfile.contact?.address?.city || '',
        state: userProfile.contact?.address?.state || '',
        zip: userProfile.contact?.address?.zip || '',
        country: userProfile.contact?.address?.country || '',
        dateOfBirth: userProfile.dateOfBirth || '',
        gender: userProfile.gender || '',
        bio: userProfile.bio || '',
      });
    }
  }, [userProfile]);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profilePicture', file);
    dispatch(uploadProfilePicture(formData));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
    setEditMode(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-semibold mb-4">User Profile</h1>
      <div className="flex items-center mb-4">
        <img
          src={userProfile?.profilePicture || defaultImg}
          alt={userProfile?.name}
          className="w-20 h-20 rounded-full mr-4"
        />
        {editMode && (
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="border-none p-2 bg-gray-200 rounded"
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={!editMode}
              onClick={() => setEditMode(true)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={!editMode}
              onClick={() => setEditMode(false)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={!editMode}
              onClick={() => setEditMode(true)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Street</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={!editMode}
              onClick={() => setEditMode(true)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={!editMode}
              onClick={() => setEditMode(true)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={!editMode}
              onClick={() => setEditMode(true)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Zip</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={!editMode}
              onClick={() => setEditMode(true)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={!editMode}
              onClick={() => setEditMode(true)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={!editMode}
              onClick={() => setEditMode(true)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={!editMode}
              onClick={() => setEditMode(true)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="3"
              disabled={!editMode}
              onClick={() => setEditMode(true)}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end">
       
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
      Save Changes
    </button> 
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
