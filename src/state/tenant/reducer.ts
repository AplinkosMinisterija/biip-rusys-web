import { createSlice } from '@reduxjs/toolkit';
import { Tenant, User } from '../../types';
import type { RootState } from '../store';

export interface UserReducerProps {
  userData: User;
}

const initialState: Tenant = { id: '', name: '', phone: '', email: '' };

export const TenantReducer = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    setTenant: (_, action) => {
      return action.payload;
    },
  },
});

export const selectUser = (state: RootState) => state;

export const actions = TenantReducer.actions;

export default TenantReducer.reducer;
