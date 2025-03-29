import { BillListItemProps } from '@/components/types';
import { firestoreDB } from '@/config/firebase';
import { formatCurrencyToNumber, generateId, handleError } from '@/utils';
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

const getBillsRef = (userId: string) =>
  collection(
    firestoreDB,
    'projects',
    'boleto-tracker',
    'users',
    userId,
    'bills'
  );

const getBillDocRef = (userId: string, billId: string) =>
  doc(
    firestoreDB,
    'projects',
    'boleto-tracker',
    'users',
    userId,
    'bills',
    billId
  );

export const getBills = createAsyncThunk<
  void,
  'current' | 'history',
  { rejectValue: string; getState: () => RootState }
>('bill/getBills', async (type, { dispatch, rejectWithValue, getState }) => {
  try {
    dispatch(setIsLoading(true));

    const userId = (getState() as RootState).user.id;
    const q = query(
      getBillsRef(userId),
      where('isPayed', '==', type === 'history')
    );

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(
      (doc) => doc.data() as BillListItemProps
    );

    dispatch(type === 'history' ? setHistoryBills(data) : setMyBills(data));
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
      const userId = (getState() as RootState).user.id;
      const billId = generateId();
      const billRef = getBillDocRef(userId, billId);

      const bill: BillListItemProps = {
        id: billId,
        title: name,
        amount: formatCurrencyToNumber(value),
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
  string,
  { rejectValue: string; getState: () => RootState; dispatch: Dispatch<any> }
>(
  'bill/payBill', // 🔴 Se corrigió aquí
  async (billId, { dispatch, rejectWithValue, getState }) => {
    try {
      if (!billId) return rejectWithValue('Não foi possível pagar boleto');

      dispatch(setIsLoading(true));
      const userId = (getState() as RootState).user.id;

      await setDoc(
        getBillDocRef(userId, billId),
        { isPayed: true },
        { merge: true }
      );
      dispatch(getBills('current'));

      return { success: true };
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const deleteBill = createAsyncThunk<
  SuccessResponseProps,
  string,
  { rejectValue: string; getState: () => RootState; dispatch: Dispatch<any> }
>('bill/deleteBill', async (id, { dispatch, rejectWithValue, getState }) => {
  try {
    if (!id) return rejectWithValue('Não foi possível excluir o boleto');

    dispatch(setIsLoading(true));
    const userId = (getState() as RootState).user.id;

    await deleteDoc(getBillDocRef(userId, id));
    dispatch(getBills('current'));

    return { success: true };
  } catch (error) {
    return rejectWithValue(handleError(error));
  } finally {
    dispatch(setIsLoading(false));
  }
});
