import { createAsyncThunk, MiddlewareApiConfig } from '@reduxjs/toolkit';
import { setUserInfo } from '../slices/userSlice';

import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import { AppDispatch } from '../store';

GoogleSignin.configure();

export type SignInResponseProps = { success: boolean };

export type DispatchAndErrorProps = {
  rejectValue: string;
  dispatch: AppDispatch;
};

export const emailSignIn = createAsyncThunk<
  SignInResponseProps,
  { email: string; password: string },
  DispatchAndErrorProps
>(
  'user/emailSignIn',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      return { success: true };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const googleSignIn = createAsyncThunk<
  SignInResponseProps,
  void,
  { rejectValue: string }
>('user/googleSignIn', async (_, { dispatch, rejectWithValue }) => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (!response || !response.data?.user) {
      return rejectWithValue('No se obtuvo usuario de Google');
    }
    dispatch(setUserInfo(response.data.user));
    return { success: true };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
