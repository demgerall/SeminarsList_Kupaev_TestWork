import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { seminarType } from '@/shared/libs/types';

//  A function to get all seminars from server data
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

//  A function to delete seminar by id from server data
export const deleteSeminarById = createAsyncThunk(
    'seminars/deleteSeminarsById',
    async (id: number, thunkApi) => {
        try {
            await axios.delete(`http://localhost:3000/seminars/${id}`);
            return id;
        } catch (e) {
            console.error(e);
            return e;
        }
    },
);

export const editSeminarById = createAsyncThunk(
    'seminars/editSeminarById',
    async (seminar: seminarType, thunkApi) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/seminars/${seminar.id}`,
                seminar,
            );
            return response.data;
        } catch (e) {
            console.error(e);
            return e;
        }
    },
);

interface StateSchema {
    seminars: Array<seminarType>;
    isLoading: boolean;
    isSuccess: boolean;
}

const initialState: StateSchema = {
    seminars: [],
    isLoading: false,
    isSuccess: false,
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
                state.isSuccess = true;
            })
            .addCase(getSeminars.rejected, state => {
                state.isLoading = false;
                state.isSuccess = false;
            })
            .addCase(deleteSeminarById.pending, state => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(deleteSeminarById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.seminars = state.seminars.filter(item => {
                    return item.id !== action.payload;
                });
            })
            .addCase(deleteSeminarById.rejected, state => {
                state.isLoading = false;
                state.isSuccess = false;
            })
            .addCase(editSeminarById.pending, state => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(editSeminarById.fulfilled, (state, action) => {
                state.seminars = state.seminars.map(item => {
                    return item.id === action.payload.id
                        ? action.payload
                        : item;
                });
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(editSeminarById.rejected, state => {
                state.isLoading = false;
                state.isSuccess = false;
            });
    },
});
