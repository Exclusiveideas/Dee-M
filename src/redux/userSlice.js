import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isLoading: false,
        error: false,
        errorMessage: "REg sample error"
    },
    reducers: {
        loginStart: (state) => {
            state.isLoading = true
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.currentUser = action.payload
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.errorMessage = action.payload;
        },
        clearError: (state) => {
            state.error = false;
            state.errorMessage = "";
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, clearError } = userSlice.actions
export default userSlice.reducer