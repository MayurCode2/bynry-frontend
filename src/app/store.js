import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import adminReducer from "../slices/adminSlice";
import userAuthReducer from "../slices/userAuthSlice";
import adminAuthReducer from "../slices/adminSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        userAuth: userAuthReducer,
        adminAuth: adminAuthReducer,
    },
    });


    export default store;