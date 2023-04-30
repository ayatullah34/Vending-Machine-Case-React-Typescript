import React, { useMemo } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector, } from "react-redux";
import { toast } from "react-toastify";
import { AnyAction, Dispatch } from 'redux';
import { coins } from "../data/coins";
import { products } from "../data/products";
import { RootState } from "../interfaces/IRootState";
import { TimerProps } from '../interfaces/ITimer';
import { setCoinTotal, setResetProductItem, setSelectedProducts } from "../redux/machineSlice";

function CashContainer({ resetTimer }: TimerProps) {
    const dispatch: Dispatch<AnyAction> = useDispatch();
    const { t } = useTranslation();
    const selectedProducts = useSelector((state: RootState) => state.machine.selectedProducts);
    const coinTotal = useSelector((state: RootState) => state.machine.coinTotal)
    const paymentTotal = useMemo(() => calculateTotalPrice(), [selectedProducts]);
    const disableOrder = useMemo(() => checkDisable(), [coinTotal, paymentTotal, selectedProducts.length]);

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

    const handleCoinClick = (item: number) => {
        const updatedCoinTotal = coinTotal + item
        dispatch(setCoinTotal(updatedCoinTotal));
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
            toast.success(t("order_placed_successfully"), {
                autoClose: 2000,
            });
        } else {
            toast.error(t("no_items_selected"), {
                autoClose: 2000,
            });
        }
    };


    return (
        <div className="cash-container">
            <div className="cash-container_items">
                {coins.map(({ value }) => (
                    <div
                        className="cash-container_items_box"
                        key={value}
                        onClick={() => handleCoinClick(value)}
                    >
                        <div>{value}</div>
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
            </div>
        </div>
    )
}

export default CashContainer