import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Product } from "../interfaces/IProduct";
import { products } from "../data/products";
import { coins } from "../data/coins";
import { toast } from "react-toastify";

const RESET_TIME_IN_MS = 0.1 * 60 * 1000; // 5 dakika
const MINUTE_IN_MS = 60 * 1000;

const VendingMachine: React.FC = () => {
	const [productItems, setProductItems] = useState(products);
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
	const [coinTotal, setCoinTotal] = useState<number>(0);
	const { t } = useTranslation();
	const paymentTotal = useMemo(() => calculateTotalPrice(), [selectedProducts]);
	const disableOrder = useMemo(() => checkDisable(), [coinTotal, paymentTotal, selectedProducts.length]);
	const [timeLeft, setTimeLeft] = useState<number>(0);

	const formatTime = (timeInMs: number) => {
		const minutes = Math.floor(timeInMs / MINUTE_IN_MS);
		const seconds = Math.floor((timeInMs % MINUTE_IN_MS) / 1000);
		return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	console.log("render ");

	//Fraud
	function checkDisable(): Boolean {
		if (coinTotal >= paymentTotal && selectedProducts.length > 0) {
			return false;
		}
		return true;
	}

	const handleProductClick = (item: Product) => {
		const selectedProductIndex = selectedProducts.findIndex(
			(product) => product.name === item.name
		);

		if (selectedProductIndex > -1) {
			const updatedSelectedProducts = [...selectedProducts];
			updatedSelectedProducts.splice(selectedProductIndex, 1);
			setSelectedProducts(updatedSelectedProducts);
			setProductItems((prev) =>
				prev.map((product) =>
					product.name === item.name ? { ...product, disabled: false } : product
				)
			);
		} else {
			setSelectedProducts([...selectedProducts, item]);
			setProductItems((prev) =>
				prev.map((product) =>
					product.name === item.name ? { ...product, disabled: true } : product
				)
			);
		}
	};

	const handleCoinClick = (item: number) => {
		setCoinTotal((prev) => prev + item);
	};

	function calculateTotalPrice(): number {
		return (
			selectedProducts.reduce((total, product) => total + product.price, 0)
		);
	}

	// Reset process
	const handleResetClick = () => {
		setSelectedProducts([]);
		setCoinTotal(0);
		setProductItems(products);
	};

	// Tempature products
	useEffect(() => {
		const intervalId = setInterval(() => {
			setProductItems((prev) =>
				prev.map((product) =>
					product.temperature >= 5
						? { ...product, temperature: product.temperature - 5 }
						: product
				)
			);
		}, 10000);

		return () => clearInterval(intervalId);
	}, []);

	const handlePaymentClick = () => {
		const paymentTotal = calculateTotalPrice();
		if (disableOrder) {
			return;
		}
		if (coinTotal >= paymentTotal) {
			handleResetClick();
			toast.success(t("order_placed_successfully"), {
				autoClose: 2000,
			});
		} else {
			toast.error(t("no_items_selected"), {
				autoClose: 2000,
			});
		}
	};

	useEffect(() => {
		if (selectedProducts.length > 0) {
			const disableActions = () => {
				setSelectedProducts([]);
				setCoinTotal(0);
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
		}
	}, [selectedProducts]);


	return (
		<div className="app-container">
			<div className="vending-machine-container">
				{/* <h1>{interactionTimeLeft}</h1> */}
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
			</div>
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
		</div>
	);

};

export default VendingMachine;