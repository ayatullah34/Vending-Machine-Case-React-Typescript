interface Item {
	name: string;
	price: number;
	image: string;
}

const VENDING_ITEMS: Item[] = [
	{
		name: "Coca Cola",
		price: 2.5,
		image: `${process.env.PUBLIC_URL}/assets/coca-cola.png`,
	},
	{
		name: "Pepsi",
		price: 2,
		image: `${process.env.PUBLIC_URL}/assets/pepsi.png`,
	},
	{
		name: "Fanta",
		price: 1.75,
		image: `${process.env.PUBLIC_URL}/assets/fanta.png`,
	},
	{
		name: "Lipton Ice Tea",
		price: 2.25,
		image: `${process.env.PUBLIC_URL}/assets/lipton.png`,
	},
	{
		name: "Sprite",
		price: 1.5,
		image: `${process.env.PUBLIC_URL}/assets/sprite.png`,
	},
];