import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SingleCoin } from "../config/api";
import { useParams } from 'react-router-dom';



export const fetchCoinSlice = createAsyncThunk(
    'coin/fetchCoinSlice',
    async function (id) {


        const response = await fetch(SingleCoin(id));

        const data = await response.json();
        console.log(data)
        return data;
    }
)
// console.log(fetchCoinSlice)

const coinSlice = createSlice({
    name: 'coin',
    initialState: {
        coin: [],
    },
    extraReducers: {
        [fetchCoinSlice.fulfilled]: (state, action) => {
            // state.status = 'resolved';
            // закидываем в массив то что пришло асинхронно
            state.coin = action.payload;
        },
    }
})


export default coinSlice.reducer
