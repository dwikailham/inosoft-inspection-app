import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DropdownData {
  yards: { id: string; name: string }[];
  units: { id: string; name: string }[];
  serviceTypes: { id: string; name: string }[];
  tpis: { id: string; name: string }[];
  customers: { id: string; name: string }[];
  itemCodes: { id: string; code: string; desc: string; batch: string }[];
  stocks: { id: string; code: string; lot_no: string; allocation: string; owner: string; condition: string; avail_qty: number }[];
  scopes: { id: string; name: string; included: string[] }[];
}

interface DropdownState {
  data: DropdownData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DropdownState = {
  data: null,
  status: 'idle',
  error: null,
};

const dropdownSlice = createSlice({
  name: 'dropdowns',
  initialState,
  reducers: {
    setDropdownsStart(state) {
      state.status = 'loading';
      state.error = null;
    },
    setDropdownsSuccess(state, action: PayloadAction<DropdownData>) {
      state.status = 'succeeded';
      state.data = action.payload;
    },
    setDropdownsFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setDropdownsStart, setDropdownsSuccess, setDropdownsFailure } = dropdownSlice.actions;
export default dropdownSlice.reducer;
