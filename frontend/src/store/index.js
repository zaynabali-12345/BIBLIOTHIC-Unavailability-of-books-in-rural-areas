import { configureStore } from '@reduxjs/toolkit';
import { GoogleOAuthProvider } from "@react-oauth/google";
import authReducer from "./auth";

const store = configureStore ({
    reducer: {
        auth: authReducer,
        
    },
    
});

export default store;