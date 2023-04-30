import React, { useMemo, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector, } from "react-redux";
import { toast } from "react-toastify";
import { AnyAction, Dispatch } from 'redux';
import { coins } from "../data/coins";
import { products } from "../data/products";
import { RootState } from "../interfaces/IRootState";
import { TimerProps } from '../interfaces/ITimer';
import { setCoinTotal, setResetProductItem, setSelectedProducts } from "../redux/machineSlice";
import { Coin } from '../interfaces/ICoin';
import CollectMoney from './CollectMoney';

function CashContainer({ resetTimer }: TimerProps) {
    const dispatch: Dispatch<AnyAction> = useDispatch();
    const { t } = useTranslation();
    const selectedProducts = useSelector((state: RootState) => state.machine.selectedProducts);
    const coinTotal = useSelector((state: RootState) => state.machine.coinTotal)
    const paymentTotal = useMemo(() => calculateTotalPrice(), [selectedProducts]);
    const disableOrder = useMemo(() => checkDisable(), [coinTotal, paymentTotal, selectedProducts.length]);
    const [totalCollected, setTotalCollected] = useState<number>(0)

    // Determine if the inserted coin is valid
    const isValidCoin = (coin: Coin): boolean => {
        // A valid coin must exist in the `coins` array with the same value as the inserted coin
        return coins.some(c => c.value === coin.value && c.weight === coin.weight);
    };

    function calculateTotalPrice(): number {
        return (
            selectedProducts.reduce((total, product) => total + product.price, 0)
        );
    }

    //Fraud
    function checkDisable(): Boolean {
        if (coinTotal >= paymentTotal && selectedProducts.length > 0) {
            return false;
        }
        return true;
    }

    const handleCoinClick = (item: Coin) => {
        if (isValidCoin(item)) {
            const updatedCoinTotal = coinTotal + item.value
            dispatch(setCoinTotal(updatedCoinTotal));
        } else {
            toast.error(t("invalid_coin"), {
                autoClose: 2000,
            });
        }
    };

    // Reset process
    const handleResetClick = () => {
        dispatch(setSelectedProducts([]));
        dispatch(setCoinTotal(0));
        dispatch(setResetProductItem(new Date().toISOString()));
    };

    const handlePaymentClick = () => {
        const paymentTotal = calculateTotalPrice();
        if (disableOrder) {
            return;
        }
        if (coinTotal >= paymentTotal) {
            handleResetClick();
            resetTimer();
            setTotalCollected((prev) => prev + paymentTotal)
            toast.success(t("order_placed_successfully"), {
                autoClose: 2000,
            });
        } else {
            toast.error(t("no_items_selected"), {
                autoClose: 2000,
            });
        }
    };

    const resetTotalMoney = ()=>{
        setTotalCollected(0)
    }


    return (
        <div className="cash-container">
            <div className="cash-container_items">
                {coins.map((item) => (
                    <div
                        className="cash-container_items_box"
                        key={item.weight}
                        onClick={() => handleCoinClick(item)}
                    >
                        <div>{item.value}</div>
                    </div>
                ))}
            </div>
            <div className="cash-container_div">
                <div className="cash-container_div_total-coin">
                    {`Coin: $${coinTotal}`}
                </div>
                <div className="cash-container_div_total">
                    {`${t("total")}: $${paymentTotal}`}
                </div>
                <div className="cash-container_div_action">
                    <div
                        className="cash-container_div_action_cancel"
                        onClick={handleResetClick}
                    >
                        {t("cancel")}
                    </div>
                    <div
                        className={`cash-container_div_action_complete ${disableOrder ? "disabled" : ""}`}
                        onClick={handlePaymentClick}
                    >
                        {t("place_order")}
                    </div>
                </div>
                <CollectMoney totalCollected={totalCollected} reset={resetTotalMoney}/>
            </div>
        </div>
    )
}

export default CashContainer