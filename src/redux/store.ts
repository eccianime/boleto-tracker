import { configureStore } from '@reduxjs/toolkit';

import appReducer from './slices/appSlice';
import userReducer from './slices/userSlice';
import billReducer from './slices/billSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    bill: billReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
