import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { products } from "../data/products";
import { Product } from "../interfaces/IProduct";

const machineSlice = createSlice({
    name: "machine",
    initialState: {
        coinTotal: 0,
        selectedProducts: <Product[]>([]),
        resetProductItem: <String>("")
    },
    reducers: {
        setCoinTotal: (state, action: PayloadAction<number>) => {
            state.coinTotal = action.payload;
        },
        setSelectedProducts: (state, action: PayloadAction<Product[]>) => {
            state.selectedProducts = action.payload;
        },
        setResetProductItem: (state, action: PayloadAction<String>) => {
            state.resetProductItem = action.payload;
        },

    },
    extraReducers: () => { }
})
export const { setCoinTotal, setSelectedProducts,setResetProductItem } = machineSlice.actions
export default machineSlice.reducer


