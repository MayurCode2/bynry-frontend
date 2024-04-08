import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = "http://localhost:5000"; // Replace with your actual API URL

const getToken = () => {
 return localStorage.getItem('token'); // Adjust the key if necessary
};
 
   export const addUser = createAsyncThunk('admin/addUser', async (userData) => {
    try {
       const response = await axios.post(`${API_URL}/admin/users`, userData, {
         headers: {
           Authorization: `${getToken()}`,
         },
       });
       return response.data;
    } catch (error) {
       throw error.response.data;
    }
   });
   
   export const updateUser = createAsyncThunk('admin/updateUser', async ({ id, userData }) => {
    try {
       const response = await axios.put(`${API_URL}/admin/users/${id}`, userData, {
         headers: {
           Authorization: `${getToken()}`,
         },
       });
       return response.data;
    } catch (error) {
       throw error.response.data;
    }
   });
   
   export const deleteUser = createAsyncThunk('admin/deleteUser', async (id) => {
    try {
       const response = await axios.delete(`${API_URL}/admin/users/${id}`, {
         headers: {
           Authorization: `${getToken()}`,
         },
       });
       return id;
    } catch (error) {
       throw error.response.data;
    }
   });
   




   const adminSlice = createSlice({
    name: 'admin',
    initialState: {
      status: 'idle',
      error: null,
      userList: [],
      userProfile: {},
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          // Handle adding a new user, e.g., update user list
          state.userList.push(action.payload);
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          // Handle updating a user, e.g., update user list
          state.userList = state.userList.map((user) =>
            user.id === action.payload.id ? action.payload : user
          );
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          // Handle deleting a user, e.g., update user list
          state.userList = state.userList.filter((user) => user.id !== action.payload);
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
   
   export default adminSlice.reducer;
   