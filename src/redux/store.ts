import { configureStore } from '@reduxjs/toolkit';
import dataReduser from './slices/dataSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: { data: dataReduser },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
