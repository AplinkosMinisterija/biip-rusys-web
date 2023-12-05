import { createSlice } from '@reduxjs/toolkit';
import { Columns } from '../../types';
import { handleToggleColumns } from '../../utils/functions';
import {
  deletedRequestsLabels,
  myObservationFormLabels,
  myRequestsLabels,
  observationFormLabels,
  requestsLabels,
  tenantUsersLabels,
} from '../../utils/texts';

interface ColumnsState {
  observation: Columns;
  myObservation: Columns;
  request: Columns;
  myRequest: Columns;
  deletedRequest: Columns;
  tenantUser: Columns;
}

const initialState: ColumnsState = {
  observation: observationFormLabels,
  myObservation: myObservationFormLabels,
  request: requestsLabels,
  myRequest: myRequestsLabels,
  deletedRequest: deletedRequestsLabels,
  tenantUser: tenantUsersLabels,
};

export const TableColumns = createSlice({
  name: 'tableColumns',
  initialState,
  reducers: {
    toggleObservationColumns: (state, action) => {
      handleToggleColumns(state.observation, action.payload);
    },
    toggleMyObservationColumns: (state, action) => {
      handleToggleColumns(state.myObservation, action.payload);
    },
    toggleRequestColumns: (state, action) => {
      handleToggleColumns(state.request, action.payload);
    },
    toggleMyRequestColumns: (state, action) => {
      handleToggleColumns(state.myRequest, action.payload);
    },
    toggleDeletedRequestColumns: (state, action) => {
      handleToggleColumns(state.deletedRequest, action.payload);
    },
    toggleTenantUserColumns: (state, action) => {
      handleToggleColumns(state.tenantUser, action.payload);
    },
  },
});

export default TableColumns.reducer;

export const actions = TableColumns.actions;
