import { Product } from "./IProduct";

export type RootState = {
    machine: {
        coinTotal: number;
        selectedProducts: Product[];
        resetProductItem: String;
    };
}