import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Product } from "../interfaces/IProduct";
import { products } from "../data/products";
import { coins } from "../data/coins";
import { toast } from "react-toastify";

const VendingMachine: React.FC = () => {
	const [productItems, setProductItems] = useState(products);
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
	const [coinTotal, setCoinTotal] = useState<number>(0);
	const { t } = useTranslation();
	const paymentTotal = useMemo(() => calculateTotalPrice(), [
		selectedProducts,
		coinTotal,
	]);

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
			selectedProducts.reduce((total, product) => total + product.price, 0) +
			coinTotal
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
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	//Fraud
	useEffect(() => {
		if (coinTotal > paymentTotal) {
			setSelectedProducts([]);
			setCoinTotal(0);
			setProductItems(products);
			toast.error(t("fraud_alert"), {
				position: "bottom-right",
				autoClose: 2000,
			});
		}
	}, [coinTotal, paymentTotal, products, selectedProducts, t]);

	const handlePaymentClick = () => {
		const paymentTotal = calculateTotalPrice();

		if (paymentTotal > 0) {
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
	return (
		<div className="app-container">
			<div className="vending-machine-container">
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
							className="cash-container_div_action_complete"
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
