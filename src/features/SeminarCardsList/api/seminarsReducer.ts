import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { seminarType } from '@/shared/libs/types';

export const getSeminars = createAsyncThunk(
    'seminars/getSeminars',
    async (__, thunkApi) => {
        try {
            const response = await axios.get('http://localhost:3000/seminars');
            return response.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
);

interface StateSchema {
    seminars: Array<seminarType>;
    isLoading: boolean;
}

const initialState: StateSchema = {
    seminars: [],
    isLoading: false,
};

export const seminarsSlice = createSlice({
    name: 'seminars',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getSeminars.pending, state => {
                state.isLoading = true;
            })
            .addCase(getSeminars.fulfilled, (state, action) => {
                state.seminars = action.payload;
                state.isLoading = false;
            })
            .addCase(getSeminars.rejected, state => {
                state.isLoading = false;
            });
    },
});
