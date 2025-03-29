import { BillListItemProps } from '@/components/types';
import { firestoreDB } from '@/config/firebase';
import { generateId, handleError } from '@/utils';
import { AnyAction, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { setHistoryBills, setIsLoading, setMyBills } from '../slices';
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

    const q = query(billRef, where('isPayed', '==', type === 'history'));
    const querySnapshot = await getDocs(q);

    let data: BillListItemProps[] = [];
    if (querySnapshot.docs.length > 0) {
      data = querySnapshot.docs.map((doc) => doc.data()) as BillListItemProps[];
    }
    if (type === 'history') {
      dispatch(setHistoryBills(data as BillListItemProps[]));
    } else {
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

export const payBill = createAsyncThunk<
  SuccessResponseProps,
  string | undefined,
  { rejectValue: string; getState: () => RootState; dispatch: Dispatch<any> }
>(
  'bill/registerBill',
  async (billId, { dispatch, rejectWithValue, getState }) => {
    try {
      if (!billId) {
        return rejectWithValue('Não foi possível pagar boleto');
      }
      dispatch(setIsLoading(true));
      const userId = (getState() as RootState).user.id;

      const billRef = doc(
        firestoreDB,
        'projects',
        'boleto-tracker',
        'users',
        userId,
        'bills',
        billId
      );

      await setDoc(billRef, { isPayed: true }, { merge: true });
      dispatch(getBills('current'));

      return { success: true };
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const deleteBill = createAsyncThunk<
  SuccessResponseProps,
  string | undefined,
  { rejectValue: string; getState: () => RootState; dispatch: Dispatch<any> }
>('bill/deleteBill', async (id, { dispatch, rejectWithValue, getState }) => {
  try {
    dispatch(setIsLoading(true));
    if (!id) {
      return rejectWithValue('Não foi possível excluir o boleto');
    }
    const userId = (getState() as RootState).user.id;
    const billRef = doc(
      firestoreDB,
      'projects',
      'boleto-tracker',
      'users',
      userId,
      'bills',
      id
    );
    await deleteDoc(billRef);
    dispatch(getBills('current'));
    return { success: true };
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});
