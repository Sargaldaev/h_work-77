import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { IMessageCreate, IMessages } from '../types';

export const fetchData = createAsyncThunk<IMessages[]>(
  'message/fetchData',
  async () => {

    const {data} = await axiosApi.get<IMessages[]>('/messages');

    return data;
  }
);

export const postData = createAsyncThunk<void, IMessageCreate>(
  'message/postData',
  async (arg) => {

    const formData = new FormData();

    const keys = Object.keys(arg) as (keyof IMessageCreate)[];
    keys.forEach(key => {
      const value = arg[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/messages',formData);

  }
);

