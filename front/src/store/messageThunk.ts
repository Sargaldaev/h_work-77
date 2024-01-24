import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { IMessages } from '../types';

export const fetchData = createAsyncThunk<IMessages[]>(
  'message/fetchData',
  async () => {

    const {data} = await axiosApi.get<IMessages[]>('/messages');

    return data;
  }
);