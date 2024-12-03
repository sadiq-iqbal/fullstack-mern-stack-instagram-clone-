import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (creds) => {
        try {
            const response = await axios.post("http://localhost:3000/login", creds);
            return response.data; // Return the response data 
            // question where is the return stored
            // answer its is stored in the payload of the action
        } catch (error) {
            throw error.response.data; // Throw the error message
        }
    }
);

export default loginUser