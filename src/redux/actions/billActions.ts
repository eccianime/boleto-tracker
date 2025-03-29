import { BillListItemProps } from '@/components/types';
import { firestoreDB } from '@/config/firebase';
import { generateId, handleError } from '@/utils';
import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { setIsLoading, setMyBills } from '../slices';
import { RootState } from '../store';
import { BillRegisterInputProps, SuccessResponseProps } from '../types';

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
      dispatch(setMyBills(data as BillListItemProps[]));
    }
  } catch (error) {
    return rejectWithValue(handleError(error));
  } finally {
    dispatch(setIsLoading(false));
  }
});

export const registerBill = createAsyncThunk<
  SuccessResponseProps,
  BillRegisterInputProps,
  { rejectValue: string; getState: () => RootState; dispatch: Dispatch }
>(
  'bill/registerBill',
  async (
    { name, value, dueDate, barCode },
    { dispatch, rejectWithValue, getState }
  ) => {
    try {
      dispatch(setIsLoading(true));
      const unformattedNumber = Number(value.replace(/\D/g, '')) / 100;
      const userId = (getState() as RootState).user.id;

      const billId = generateId();
      const billRef = doc(
        firestoreDB,
        'projects',
        'boleto-tracker',
        'users',
        userId,
        'bills',
        billId
      );
      const bill: BillListItemProps = {
        id: billId,
        title: name,
        amount: unformattedNumber,
        expireDate: dueDate,
        barCode,
        createdAt: new Date().toISOString(),
        isPayed: false,
      };
      await setDoc(billRef, bill);
      return { success: true };
    } catch (error) {
      return rejectWithValue(handleError(error));
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
