import { createSlice } from '@reduxjs/toolkit';
import { IMessages } from '../types';
import { fetchData, postData } from './messageThunk';


interface MessagesState {
  messages: IMessages[];
  fetchLoad: Boolean;
  postLoad: Boolean;
}

const initialState: MessagesState = {
  messages: [],
  fetchLoad: false,
  postLoad: false
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


    builder.addCase(postData.pending, (state) => {
      state.postLoad = true;
    });
    builder.addCase(postData.fulfilled, (state, action) => {
      state.postLoad = false;
    });
    builder.addCase(postData.rejected, (state) => {
      state.postLoad = false;
    });

  }
});

export const MessageReducer = MessageSlice.reducer;