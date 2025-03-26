import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import appReducer from './slices/appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
