import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = "http://localhost:5000"; // Replace with your actual API URL

const getToken = () => {
 return localStorage.getItem('token'); // Adjust the key if necessary
};// Async Thunks for Admin Authentication
export const adminRegister = createAsyncThunk(
 'adminAuth/registerAdmin',
 async ({ name,email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/admin/register`, {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
 }
);

export const adminLogin = createAsyncThunk(
    'adminAuth/loginAdmin',
    async ({ email, password }, thunkAPI) => {
       try {
         const response = await axios.post(`${API_URL}/admin/login`, {
           email,
           password,
         });
         // Save the new token and admin data to local storage
         localStorage.setItem('token', response.data.token);
         localStorage.setItem('admin', JSON.stringify(response.data.admin));
   
         return response.data;
       } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data);
       }
    }
   );

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState: {
       token: null,
       admin: null,
       authStatus: 'idle', // "idle", "loading", "fulfilled", or "rejected"
       error: null,
    },
    reducers: {
       logoutAdmin: (state) => {
         localStorage.removeItem('token');
         localStorage.removeItem('admin');
         state.admin = null;
         state.token = null;
       },
    },
    extraReducers: (builder) => {
       builder
         .addCase(adminRegister.pending, (state) => {
           state.authStatus = 'loading';
         })
         .addCase(adminRegister.fulfilled, (state, action) => {
           state.authStatus = 'fulfilled';
           state.token = action.payload.token;
           state.admin = action.payload.admin;
         })
         .addCase(adminRegister.rejected, (state, action) => {
           state.authStatus = 'error';
           state.error = action.payload;
         })
         .addCase(adminLogin.pending, (state) => {
           state.authStatus = 'loading';
         })
         .addCase(adminLogin.fulfilled, (state, action) => {

            localStorage.removeItem('token');
            localStorage.removeItem("user")
            localStorage.removeItem("admin")
           state.authStatus = 'fulfilled';
           state.token = action.payload.token;
           state.admin = action.payload.admin;
   
           // Save the new token to local storage
           localStorage.setItem('token', state.token);
           localStorage.setItem('admin', JSON.stringify(state.admin));
         })
         .addCase(adminLogin.rejected, (state, action) => {
           state.authStatus = 'error';
           state.error = action.payload;
         });
    },
   });
   
   export const { logoutAdmin } = adminAuthSlice.actions;
   
   export default adminAuthSlice.reducer;
   
