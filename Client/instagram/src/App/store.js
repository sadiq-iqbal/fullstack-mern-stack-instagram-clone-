import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/user/userSlice.js';
const store = configureStore({
    reducer: {
        user: authReducer
    },
});

export default store