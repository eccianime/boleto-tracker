import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AppStateProps, BillStateProps } from '../types';

const initialState: BillStateProps = {
  current: [],
  history: [],
};

export const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    setMyBills: (state, action: PayloadAction<BillStateProps['current']>) => {
      state.current = action.payload;
    },
    setHistoryBills: (
      state,
      action: PayloadAction<BillStateProps['history']>
    ) => {
      state.history = action.payload;
    },
  },
});

export const { setMyBills, setHistoryBills } = billSlice.actions;

export default billSlice.reducer;
