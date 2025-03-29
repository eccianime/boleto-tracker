import { createAsyncThunk, MiddlewareApiConfig } from '@reduxjs/toolkit';

import { auth, firestoreDB } from '@/config/firebase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { handleError } from '@/utils';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { setIsLoading } from '../slices';
import { setUserInfo } from '../slices/userSlice';
import {
  DispatchAndErrorProps,
  SuccessResponseProps,
  SignUpInputProps,
  UserStateProps,
} from '../types';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

GoogleSignin.configure();

export const emailSignIn = createAsyncThunk<
  SuccessResponseProps,
  { email: string; password: string },
  DispatchAndErrorProps
>(
  'user/emailSignIn',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setIsLoading(true));
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userRef = doc(
        firestoreDB,
        'projects',
        'boleto-tracker',
        'users',
        user.uid
      );
      const userSnap = await getDoc(userRef);

      const userInfo = userSnap.data() as UserStateProps;

      const userData: UserStateProps = {
        id: user.uid,
        name: userInfo?.name || 'Usuário',
        givenName: userInfo?.givenName || 'Usuário',
        familyName: userInfo?.familyName || 'Usuário',
        email: userInfo?.email || email,
        photo: userInfo?.photo || '',
        from: userInfo.from || 'app',
        createdAt: userInfo?.createdAt || new Date().toISOString(),
      };

      dispatch(setUserInfo(userData)); // Guardar usuario en Redux

      return { success: true, user: userData };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const emailRegister = createAsyncThunk<
  SuccessResponseProps,
  SignUpInputProps,
  DispatchAndErrorProps
>(
  'user/emailRegister',
  async (
    { name, lastName, email, password, photo },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setIsLoading(true));
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;

      if (!user) {
        return rejectWithValue(
          'Teve um erro para criar o usuário, tente novamente mais tarde'
        );
      }

      let photoUrl = '';
      if (photo) {
        const storage = getStorage();
        const fileUri = photo;
        const fileExtension = fileUri.split('.').pop();

        const storageRef = ref(
          storage,
          `proyects/boleto-tracker/user_photos/${user.uid}${fileExtension}`
        );
        const response = await fetch(fileUri);
        const blob = await response.blob();

        const uploadResult = await uploadBytes(storageRef, blob);

        photoUrl = await getDownloadURL(uploadResult.ref);
      }

      const userData = {
        id: user.uid,
        name: `${name} ${lastName}`,
        givenName: name,
        familyName: lastName,
        email,
        photo: photoUrl,
        from: 'app' as const,
        createdAt: new Date().toISOString(),
      };

      await dispatch(saveUser(userData)).unwrap();
      dispatch(setUserInfo(userData));

      return { success: true };
    } catch (error) {
      return rejectWithValue(handleError(error));
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const googleSignIn = createAsyncThunk<
  SuccessResponseProps,
  void,
  { rejectValue: string }
>('user/googleSignIn', async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setIsLoading(true));
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();

    if (!response || !response.data?.user) {
      return rejectWithValue('No se obtuvo usuario de Google');
    }
    const userData = {
      ...response.data.user,
      from: 'google' as const,
    } as UserStateProps;

    await dispatch(saveUser(userData)).unwrap();
    dispatch(setUserInfo(response.data.user));
    return { success: true };
  } catch (error) {
    return rejectWithValue(handleError(error));
  } finally {
    dispatch(setIsLoading(false));
  }
});

const saveUser = createAsyncThunk<
  void,
  UserStateProps,
  { rejectValue: string }
>('user/saveUser', async (user, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setIsLoading(true));
    const targetUserRef = doc(
      firestoreDB,
      'projects',
      'boleto-tracker',
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
        from: user.from,
        createdAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    return rejectWithValue(handleError(error));
  } finally {
    dispatch(setIsLoading(false));
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
