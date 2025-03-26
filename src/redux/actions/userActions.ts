import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUserInfo } from '../slices/userSlice';

export const signIn = createAsyncThunk(
  'user/signIn',
  async ({ email, password }, { dispatch }) => {
    try {
    } catch (error) {}
  }
);
