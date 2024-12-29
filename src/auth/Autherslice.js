// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  forgotPasswordLoading: false,
  resetPasswordLoading: false,
  forgotPasswordError: null,
  resetPasswordError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    forgotPasswordRequest: (state) => {
      state.forgotPasswordLoading = true;
      state.forgotPasswordError = null;
    },
    forgotPasswordSuccess: (state) => {
      state.forgotPasswordLoading = false;
    },
    forgotPasswordFailure: (state, action) => {
      state.forgotPasswordLoading = false;
      state.forgotPasswordError = action.payload;
    },
    resetPasswordRequest: (state) => {
      state.resetPasswordLoading = true;
      state.resetPasswordError = null;
    },
    resetPasswordSuccess: (state) => {
      state.resetPasswordLoading = false;
    },
    resetPasswordFailure: (state, action) => {
      state.resetPasswordLoading = false;
      state.resetPasswordError = action.payload;
    },
  },
});

export const {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
} = authSlice.actions;

export default authSlice.reducer;
