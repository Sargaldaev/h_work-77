import { createSlice } from '@reduxjs/toolkit';
import { IMessages } from '../types';
import { fetchData } from './messageThunk';


interface MessagesState {
  messages: IMessages[];
  fetchLoad: Boolean;
}

const initialState: MessagesState = {
  messages: [],
  fetchLoad: false,
};

export const MessageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchData.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.fetchLoad = false;
      state.messages = action.payload;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.fetchLoad = false;
    });

  }
});

export const MessageReducer = MessageSlice.reducer;