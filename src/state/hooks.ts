import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { TableData, TableRow } from '../components/tables/table';
import { handleErrorFromServerToast } from '../utils/functions';
import type { AppDispatch, RootState } from './store';

interface TableDataProp {
  endpoint: () => Promise<any>;
  mapData: (props: any) => TableRow[];
  dependencyArray: any[];
  name: string;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTableData = ({ endpoint, mapData, dependencyArray, name }: TableDataProp) => {
  const [tableData, setTableData] = useState<TableData>({ data: [] });

  const { isFetching } = useQuery([name, dependencyArray], () => endpoint(), {
    onError: () => {
      handleErrorFromServerToast();
    },
    onSuccess: (list) => {
      setTableData({
        data: mapData(list?.rows || []),
        totalPages: list?.totalPages,
      });
    },
  });

  return { tableData, loading: isFetching };
};

export const useGenericTablePageHooks = () => {
  const [searchParams] = useSearchParams();
  const { page } = Object.fromEntries([...Array.from(searchParams)]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  return { page, navigate, dispatch, location };
};

export const useKeyAction = (action: (option?: any) => void, disabled = false) => {
  return useCallback(
    (option?: any) => (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
        e.stopPropagation();
        e.preventDefault();
        action(option);
      }
    },
    [action, disabled],
  );
};
