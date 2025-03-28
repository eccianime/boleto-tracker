import { handleError } from '@/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsLoading } from '../slices';
import { collection, getDocs } from 'firebase/firestore';
import { firestoreDB } from '@/config/firebase';
import { RootState } from '../store';

export const getBills = createAsyncThunk<
  void,
  'current' | 'history',
  { rejectValue: string; getState: () => RootState }
>('bill/getBills', async (type, { dispatch, rejectWithValue, getState }) => {
  try {
    dispatch(setIsLoading(true));

    const userId = (getState() as RootState).user.id;
    const billRef = collection(
      firestoreDB,
      'projects',
      'boleto-tracker',
      'users',
      userId,
      'bills'
    );

    const querySnapshot = await getDocs(billRef);

    if (querySnapshot.docs.length > 0) {
      const data = querySnapshot.docs.map((doc) => doc.data());
      dispatch({ type: 'bill/setBills', payload: data });
    }
  } catch (error) {
    return rejectWithValue(handleError(error));
  } finally {
    dispatch(setIsLoading(false));
  }
});

export const registerBill = createAsyncThunk<
  void,
  'current' | 'history',
  { rejectValue: string; getState: () => RootState }
>('bill/getBills', async (type, { dispatch, rejectWithValue, getState }) => {
  try {
  } catch (error) {
    return rejectWithValue(handleError(error));
  } finally {
    dispatch(setIsLoading(false));
  }
});
