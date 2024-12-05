// Slice for authentication
import { createSlice } from "@reduxjs/toolkit";
import loginUser from "./userThunk";
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null,
        status: "idle"
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = "pending";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user; // Assuming the server returns a `user` object
                state.token = action.payload.token; // Assuming the server returns a `token`
                state.isAuthenticated = action.payload.isAuthenticated;
                state.status = "succeed"
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // The custom error message from `rejectWithValue`
                state.status = "failed"
            });
    },
});

export const { logout } = authSlice.actions; // Export the logout action
export const selectUser = (state) => state.user.user;
export const loading = (state) => state.user.loading;
export const error = (state) => state.user.error;
export const status = (state) => state.user.status;
export default authSlice.reducer; // Export the slice reducer