import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:5000"; // Replace with your actual API URL

const getToken = () => {
 return localStorage.getItem('token'); // Adjust the key if necessary
};





// Async Thunks
export const getAllUsers = createAsyncThunk('users/', async () => {
 try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `${getToken()}`,
      },
    });
    return response.data;
 } catch (error) {
    throw error.response.data;
 }
});

export const getUserById = createAsyncThunk('users/getUserById', async (id) => {
 try {
    const response = await axios.get(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `${getToken()}`,
      },
    });
    return response.data;
 } catch (error) {
    throw error.response.data;
 }
});


export const getUserProfile = createAsyncThunk('users/getUserProfile', async () => {
 try {
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `${getToken()}`,
      },
    });
    return response.data;
 } catch (error) {
    throw error.response.data;
 }
});

export const updateUserProfile = createAsyncThunk('users/updateUserProfile', async (userData) => {
 try {
    const response = await axios.put(`${API_URL}/users/profile-update`, userData, {
      headers: {
        Authorization: `${getToken()}`,
      },
    });
    return response.data;
 } catch (error) {
    throw error.response.data;
 }
});

export const uploadProfilePicture = createAsyncThunk('users/uploadProfilePicture', async (formData) => {
 try {
    const response = await axios.post(`${API_URL}/users/profile-picture`, formData, {
      headers: {
        Authorization: `${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
 } catch (error) {
    throw error.response.data;
 }
});

export const searchUsers = createAsyncThunk('users/searchUsers', async (query) => {
 try {
    const response = await axios.get(`${API_URL}/users/search?q=${query}`, {
      headers: {
        Authorization: `${getToken()}`,
      },
    });
    return response.data;
 } catch (error) {
    throw error.response.data;
 }
});

// Redux Slice
const usersSlice = createSlice({
 name: 'user',
 initialState: {
    userList: [],
    userProfile: {},
    status: 'idle',
    error: null,
 },
 reducers: {},
 extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userList = action.payload;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userProfile = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userProfile = action.payload;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Handle profile picture upload success, e.g., update state
        state.userProfile = action.payload;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userList = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
 },
});

export default usersSlice.reducer;
