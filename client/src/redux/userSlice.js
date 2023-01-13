import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isLoading: false,
        error: false,
        errorMessage: "",
        currentChat: null,
        isSendingMessage: false,
        socket: null,
    },
    reducers: {
        authStart: (state) => {
            state.isLoading = true
        },
        authSuccess: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.currentUser = action.payload
        },
        authFailure: (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.errorMessage = action.payload;
        },
        logOut: (state) => {
            state.currentUser = null;
            state.errorMessage = "";
            state.error = false;
        },
        clearError: (state) => {
            state.error = false;
            state.errorMessage = "";
        },
        updateCurrentChat: (state, action) => {
            state.currentChat = action.payload
        },
        sendingMessage: (state, action) => {
            state.isSendingMessage = action.payload
        },
        updateSocket: (state, action) => {
            state.socket = action.payload
        }
    }
});

export const { authStart, authSuccess, authFailure, logOut, clearError, updateCurrentChat, updateSocket, sendingMessage } = userSlice.actions
export default userSlice.reducer