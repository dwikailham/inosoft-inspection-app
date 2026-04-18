'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setDropdownsStart, setDropdownsSuccess, setDropdownsFailure } from '@/store/dropdownSlice';

export function InitialDataLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDropdowns = async () => {
      dispatch(setDropdownsStart());
      try {
        const res = await axios.get('/api/dropdowns');
        dispatch(setDropdownsSuccess(res.data));
      } catch (err: unknown) {
        let errorMessage = 'Failed to load dropdowns';
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (axios.isAxiosError(err)) {
          errorMessage = err.message;
        }
        dispatch(setDropdownsFailure(errorMessage));
      }
    };

    fetchDropdowns();
  }, [dispatch]);

  return null;
}
