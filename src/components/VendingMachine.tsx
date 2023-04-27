import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface Product {
	name: string;
	price: number;
	currency: string;
	imgSrc: string;
	disabled: boolean;
}

interface Coin {
	value: number;
}

const products: Product[] = [
	{ name: "cola", price: 25, currency: "$", imgSrc: "cola.svg", disabled: false },
	{ name: "chips", price: 20, currency: "$", imgSrc: "chips.svg", disabled: false },
	{ name: "candy", price: 15, currency: "$", imgSrc: "candy.svg", disabled: false },
	{ name: "popcorn", price: 30, currency: "$", imgSrc: "popcorn.svg", disabled: false },
	{ name: "water", price: 5, currency: "$", imgSrc: "water.svg", disabled: false },
	{ name: "chocolate", price: 10, currency: "$", imgSrc: "chocolate.svg", disabled: false },
	{ name: "bread", price: 5, currency: "$", imgSrc: "bread.svg", disabled: false },
	{ name: "taco", price: 60, currency: "$", imgSrc: "taco.svg", disabled: false },
	{ name: "hotdog", price: 40, currency: "$", imgSrc: "hotdog.svg", disabled: false },
	{ name: "coffee", price: 50, currency: "$", imgSrc: "coffee.svg", disabled: false }
];

const cashItems: Coin[] = [
	{ value: 1 },
	{ value: 5 },
	{ value: 10 },
	{ value: 20 },
];

const VendingMachine: React.FC = () => {
	const [productItems, setProductItems] = useState(products);
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
	const [coinTotal, setCoinTotal] = useState<number>(0);
	const { t } = useTranslation();
	const paymentTotal = useMemo(() => calculateTotalPrice(), [selectedProducts, coinTotal]);

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
		return selectedProducts.reduce((total, product) => total + product.price, 0) + coinTotal;
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
					{cashItems.map(({ value }) => (
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
						{`${t("total")}: ${paymentTotal}`}
					</div>
				</div>
			</div>
		</div>
	);
};

export default VendingMachine;
