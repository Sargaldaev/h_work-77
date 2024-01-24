import { configureStore } from '@reduxjs/toolkit';
import { MessageReducer } from '../store/messagesSlice';

export const store = configureStore({
  reducer: {
    messages: MessageReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;