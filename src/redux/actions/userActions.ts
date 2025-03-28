import { createAsyncThunk, MiddlewareApiConfig } from '@reduxjs/toolkit';
import { setUserInfo } from '../slices/userSlice';

import { firestoreDB } from '@/config/firebase';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { doc, getDoc, setDoc } from 'firebase/firestore';
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

export const emailRegister = createAsyncThunk<
  SignInResponseProps,
  { email: string; password: string },
  DispatchAndErrorProps
>(
  'user/emailRegister',
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
    dispatch(registerUser(response.data.user));
    dispatch(setUserInfo(response.data.user));
    return { success: true };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const registerUser = createAsyncThunk<
  void,
  User['user'],
  { rejectValue: string }
>('user/registerUser', async (user, { rejectWithValue }) => {
  try {
    const targetUserRef = doc(
      firestoreDB,
      'projects',
      'payflow',
      'users',
      user.id
    );
    const targetUser = await getDoc(targetUserRef);
    if (!targetUser.exists()) {
      await setDoc(targetUserRef, {
        id: user.id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        familyName: user.familyName,
        givenName: user.givenName,
      });
    }
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const logOut = createAsyncThunk<void, void, MiddlewareApiConfig>(
  'user/logOut',
  async (_, { dispatch }) => {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    dispatch(setUserInfo(null));
  }
);
