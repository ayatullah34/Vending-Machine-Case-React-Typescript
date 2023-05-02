import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CollectMoney from '../src/components/CollectMoney';

test("renders CollectMoney component", () => {
  const { getByText, getByPlaceholderText } = render(<CollectMoney totalCollected={100} reset={() => {}} />);
  
  expect(getByText("collected_money: $100")).toBeInTheDocument();
  expect(getByPlaceholderText("enter_password")).toBeInTheDocument();
  expect(getByText("withdraw_cash")).toBeInTheDocument();
});

test("withdraw_cash button is disabled when password is incorrect", () => {
  const { getByPlaceholderText, getByText } = render(<CollectMoney totalCollected={100} reset={() => {}} />);
  const input = getByPlaceholderText("enter_password");
  const button = getByText("withdraw_cash");

  fireEvent.change(input, { target: { value: "wrongpassword" } });

  expect(button).toBeDisabled();
});

test("withdraw_cash button is disabled when totalCollected is 0", () => {
  const { getByPlaceholderText, getByText } = render(<CollectMoney totalCollected={0} reset={() => {}} />);
  const input = getByPlaceholderText("enter_password");
  const button = getByText("withdraw_cash");

  fireEvent.change(input, { target: { value: "1234" } });

  expect(button).toBeDisabled();
});

test("withdraw_cash button is enabled when password is correct and totalCollected is greater than 0", () => {
  const { getByPlaceholderText, getByText } = render(<CollectMoney totalCollected={100} reset={() => {}} />);
  const input = getByPlaceholderText("enter_password");
  const button = getByText("withdraw_cash");

  fireEvent.change(input, { target: { value: "1234" } });

  expect(button).toBeEnabled();
});

test("withdraw_cash button resets totalCollected when clicked", () => {
  const resetMock = jest.fn();
  const { getByPlaceholderText, getByText } = render(<CollectMoney totalCollected={100} reset={resetMock} />);
  const input = getByPlaceholderText("enter_password");
  const button = getByText("withdraw_cash");

  fireEvent.change(input, { target: { value: "1234" } });
  fireEvent.click(button);

  expect(resetMock).toHaveBeenCalled();
});
