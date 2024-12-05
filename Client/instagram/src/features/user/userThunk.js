import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user login
const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (creds, { rejectWithValue }) => {
        try {
            console.log("request received");
            const response = await axios.post("http://localhost:3000/login", creds);
            return response.data; // Return the response data
        } catch (error) {
            // Improved error handling: Ensure error.message is included in the rejected value
            return rejectWithValue(error.response?.data?.message || "Login failed due to an unknown error");
        }
    }
);

export default loginUser;