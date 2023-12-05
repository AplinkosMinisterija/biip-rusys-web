import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';

interface FiltersState {
  list: User[];
}

const initialState: FiltersState = {
  list: [],
};

export const Users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      return { ...state, list: action.payload };
    },
  },
});

export default Users.reducer;

export const actions = Users.actions;
