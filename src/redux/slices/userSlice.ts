import { User } from '@react-native-google-signin/google-signin';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: Omit<User['user'], 'name'> = {
  id: '',
  givenName: '',
  familyName: '',
  email: '',
  photo: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User['user'] | null>) => {
      state.id = action.payload?.id || '';
      state.givenName = action.payload?.givenName || '';
      state.familyName = action.payload?.familyName || '';
      state.email = action.payload?.email || '';
      state.photo = action.payload?.photo || '';
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
