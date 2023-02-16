import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

enum status {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}

export type DatesType = {
  Data: number;
  Description: string;
};

export type ItemType = {
  Title: string;
  Dates: DatesType[];
};

interface DataSliceState {
  items: ItemType[];
  activeCategory: number;
  currentDatesArr: DatesType[];
  status: status;
}

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const { data } = await axios.get('http://localhost:3000/db.json');
  return data;
});

const initialState: DataSliceState = {
  items: [],
  activeCategory: 0,
  currentDatesArr: [],
  status: status.LOADING,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
      state.currentDatesArr = state.items[action.payload].Dates;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.items = [];
      state.status = status.LOADING;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.items = action.payload;
      state.currentDatesArr = state.items[0].Dates.sort((x, y) => x.Data - y.Data);
      state.status = status.LOADED;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.items = [];
      state.status = status.ERROR;
    });
  },
});
export const { setActiveCategory } = dataSlice.actions;
export default dataSlice.reducer;
