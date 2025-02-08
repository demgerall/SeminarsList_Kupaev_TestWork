import { configureStore } from '@reduxjs/toolkit';

import { seminarsSlice } from '@/features';

export const store = configureStore({
    reducer: { seminars: seminarsSlice.reducer },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
