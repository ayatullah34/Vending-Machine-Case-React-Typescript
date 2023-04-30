import { configureStore } from '@reduxjs/toolkit'
import machine from './machineSlice'

export const store = configureStore({
    reducer: { machine },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})