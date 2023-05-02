import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiTimer } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AnyAction, Dispatch } from 'redux';
import { formatTime } from '../constant/commonFunc';
import { RESET_TIME_IN_MS, products } from '../data/products';
import { Product } from '../interfaces/IProduct';
import { RootState } from '../interfaces/IRootState';
import { TimerProps } from '../interfaces/ITimer';
import { setCoinTotal, setSelectedProducts } from '../redux/machineSlice';
import Leds from './Leds';

function Products({ timeLeft = 0, startTimer = () => { }, resetTimer = () => { } }: TimerProps) {
    const dispatch: Dispatch<AnyAction> = useDispatch();
    const { t } = useTranslation();
    const [productItems, setProductItems] = useState(products);
    const resetProductItem = useSelector((state: RootState) => state.machine.resetProductItem)
    const selectedProducts = useSelector((state: RootState) => state.machine.selectedProducts)
    const [isAlmostZero, setIsAlmostZero] = useState<boolean>(false);

    //The cooling system is turned off when a product is selected for energy efficiency and the light is turned on
    const coolingActive = useMemo(() => {
        const isActive = !(selectedProducts.length > 0);
        return isActive;
    }, [selectedProducts]);


    const handleProductClick = (item: Product) => {
        const selectedProductIndex = selectedProducts.findIndex(
            (product) => product.name === item.name
        );

        if (selectedProductIndex > -1) {
            const updatedSelectedProducts = [...selectedProducts];
            updatedSelectedProducts.splice(selectedProductIndex, 1);
            dispatch(setSelectedProducts(updatedSelectedProducts));
            setProductItems((prev) =>
                prev.map((product) =>
                    product.name === item.name ? { ...product, disabled: false } : product
                )
            );
        } else {
            const updatedSelectedProducts = [...selectedProducts, item];
            dispatch(setSelectedProducts(updatedSelectedProducts));
            setProductItems((prev) =>
                prev.map((product) =>
                    product.name === item.name ? { ...product, disabled: true } : product
                )
            );
        }
    };


    useEffect(() => {
        if (Object.keys(selectedProducts || []).length > 0) {
            if (startTimer) {
                startTimer();
            }
            const disableActions = () => {
                dispatch(setSelectedProducts([]));
                dispatch(setCoinTotal(0));
                setProductItems((prevItems) =>
                    prevItems.map((item) => ({
                        ...item,
                        disabled: false,
                    }))
                );
                toast.info(t("user_interaction_end"), {
                    autoClose: 2000,
                });
            };

            const interactionInterval = setInterval(() => {
                disableActions();
            }, RESET_TIME_IN_MS);

            return () => {
                clearInterval(interactionInterval);
            };
        } else {
            resetTimer();
        }
    }, [selectedProducts]);

    useEffect(() => {
        if (timeLeft) {
            if (timeLeft <= 5000) {
                setIsAlmostZero(true);
            }
            else {
                setIsAlmostZero(false);
            }
        }
    }, [timeLeft]);

    // Tempature products set to min 6°C
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (coolingActive) {
            intervalId = setInterval(() => {
                setProductItems((prev) =>
                    prev.map((product) =>
                        product.temperature >= 11
                            ? { ...product, temperature: product.temperature - 5 }
                            : product
                    )
                );
            }, 1 * 60 * 1000);
        }

        return () => clearInterval(intervalId);
    }, [coolingActive]);

    useEffect(() => {
        setProductItems(products);
    }, [resetProductItem])


    return (
        <div className="vending-machine-container">
            <h1 className={isAlmostZero ? "red-label" : ""}>
                <BiTimer />
                {timeLeft && formatTime(timeLeft)}
            </h1>
            <div className="items">
                {productItems.map((item) => (
                    <div
                        data-i18n-refund={t("refund")}
                        className={`items_box ${item.disabled ? "disabled" : ""}`}
                        key={item.name}
                        onClick={() => handleProductClick(item)}
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/products/${item.imgSrc}`}
                            alt={item.name}
                        />
                        <div>{t(item.name)}</div>
                        <div>
                            {item.currency}
                            {item.price}
                        </div>
                    </div>
                ))}
            </div>

            <Leds coolingActive={coolingActive} />
        </div>)
}

export default Products;