import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = "http://localhost:5000";




// Async Thunks for Authentication
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({name,email,password}, thunkAPI) => {
       try {
         const response = await axios.post(`${API_URL}/users/register`, {
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
   
   export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, thunkAPI) => {
       try {
         const response = await axios.post(`${API_URL}/users/login`, {
           email,
           password,
         });
         return response.data;
       } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data);
       }
    }
   );

   const authSlice = createSlice({
    name: 'auth',
    initialState: {
       token: null,
       user: null,
       authStatus: 'idle', // "idle", "loading", "fulfilled", or "rejected"
       error: null,
    },
    reducers: {
       logoutUser: (state) => {
         localStorage.removeItem('token');
         localStorage.removeItem('user');
         state.user = null;
         state.token = null;
       },
    },
    extraReducers: (builder) => {
       builder
         .addCase(registerUser.pending, (state) => {
           state.authStatus = 'loading';
         })
         .addCase(registerUser.fulfilled, (state, action) => {
           state.authStatus = 'fulfilled';
           state.token = action.payload.token;
           state.user = action.payload.user;
         })
         .addCase(registerUser.rejected, (state, action) => {
           state.authStatus = 'error';
           state.error = action.payload;
         })
         .addCase(loginUser.pending, (state) => {
           state.authStatus = 'loading';
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            localStorage.removeItem('token');
            localStorage.removeItem("user")
            localStorage.removeItem("admin")
           state.authStatus = 'fulfilled';
           state.token = action.payload.token;
           state.user = action.payload.user;
   
           // Save the new token to local storage
           localStorage.setItem('token', state.token);
           localStorage.setItem('user', JSON.stringify(state.user));
         })
         .addCase(loginUser.rejected, (state, action) => {
           state.authStatus = 'error';
           state.error = action.payload;
         });
    },
   });
   
   export const { logoutUser } = authSlice.actions;
   
   export default authSlice.reducer;
   
   