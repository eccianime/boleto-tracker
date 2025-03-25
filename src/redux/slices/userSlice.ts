import { User } from '@react-native-google-signin/google-signin';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const STATIC_STATE = {
  email: 'ingjeanpaulrojas@gmail.com',
  familyName: 'Rojas',
  givenName: 'Jean Paul Ivan',
  id: '100635621504285851624',
  photo:
    'https://lh3.googleusercontent.com/a/ACg8ocLNgQN1nRXLMym0oSfRVdPY51JQDId-iWRFH93wTpsfhAzMJuld=s120',
};

const initialState: Omit<User['user'], 'name'> = STATIC_STATE;
// {
//   id: '',
//   givenName: '',
//   familyName: '',
//   email: '',
//   photo: '',
// };

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
