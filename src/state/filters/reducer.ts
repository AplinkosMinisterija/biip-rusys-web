import { createSlice } from '@reduxjs/toolkit';
import { FormFilters, RequestFilters, UserFilters } from '../../types';

interface FiltersState {
  formFilters: FormFilters;
  myFormFilters: FormFilters;
  requestFilters: RequestFilters;
  myRequestFilters: RequestFilters;
  deletedRequestFilters: RequestFilters;
  userFilters: UserFilters;
}

const initialState: FiltersState = {
  formFilters: {},
  myFormFilters: {},
  requestFilters: {},
  userFilters: {},
  myRequestFilters: {},
  deletedRequestFilters: {},
};

export const Filters = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFormFilters: (state, action) => {
      return { ...state, formFilters: action.payload };
    },
    setMyFormFilters: (state, action) => {
      return { ...state, myFormFilters: action.payload };
    },
    setRequestFilters: (state, action) => {
      return { ...state, requestFilters: action.payload };
    },
    setMyRequestFilters: (state, action) => {
      return { ...state, myRequestFilters: action.payload };
    },
    setDeletedRequestFilters: (state, action) => {
      return { ...state, deletedRequestFilters: action.payload };
    },
    setUserFilters: (state, action) => {
      return { ...state, userFilters: action.payload };
    },
  },
});

export default Filters.reducer;

export const actions = Filters.actions;
