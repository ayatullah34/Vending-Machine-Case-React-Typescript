import React from "react";
import useTimer from "../hooks/useTimer";
import CashContainer from "./CashContainer";
import Products from "./Products";
import { RESET_TIME_IN_MS } from "../data/products";

const VendingMachine: React.FC = () => {
	const { timeLeft, startTimer, resetTimer } = useTimer({
		initialTime: RESET_TIME_IN_MS,
		onTimerEnd: () => {
			resetTimer();
		},
	});

	return (
		<div className="app-container">
			<Products timeLeft={timeLeft} startTimer={startTimer} resetTimer={resetTimer} />
			<CashContainer resetTimer={resetTimer} />
		</div>
	);

};

export default VendingMachine;
