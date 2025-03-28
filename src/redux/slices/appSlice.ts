import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AppStateProps } from '../types';

const initialState: AppStateProps = {
  bottomSheet: {
    isVisible: false,
    data: null,
  },
  isLoading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setBottomSheetVisible: (
      state,
      action: PayloadAction<AppStateProps['bottomSheet']>
    ) => {
      const { isVisible, data } = action.payload;
      state.bottomSheet.isVisible = isVisible;
      state.bottomSheet.data = data;
    },
  },
});

export const { setBottomSheetVisible } = appSlice.actions;

export default appSlice.reducer;
