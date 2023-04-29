import { Product } from "../interfaces/IProduct";

const products: Product[] = [
	{ name: "cola", price: 25, currency: "$", imgSrc: "cola.svg", disabled: false, temperature: 0 },
	{ name: "chips", price: 20, currency: "$", imgSrc: "chips.svg", disabled: false, temperature: 0 },
	{ name: "candy", price: 15, currency: "$", imgSrc: "candy.svg", disabled: false, temperature: 0 },
	{ name: "popcorn", price: 30, currency: "$", imgSrc: "popcorn.svg", disabled: false, temperature: 0 },
	{ name: "water", price: 5, currency: "$", imgSrc: "water.svg", disabled: false, temperature: 0 },
	{ name: "chocolate", price: 10, currency: "$", imgSrc: "chocolate.svg", disabled: false, temperature: 0 },
	{ name: "bread", price: 5, currency: "$", imgSrc: "bread.svg", disabled: false, temperature: 0 },
	{ name: "taco", price: 60, currency: "$", imgSrc: "taco.svg", disabled: false, temperature: 0 },
	{ name: "hotdog", price: 40, currency: "$", imgSrc: "hotdog.svg", disabled: false, temperature: 0 },
	{ name: "coffee", price: 50, currency: "$", imgSrc: "coffee.svg", disabled: false, temperature: 0 }
];

export {
	products,
}