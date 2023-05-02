import "@testing-library/jest-dom/extend-expect";
import React from "react";
import CashContainer from '../src/components/CashContainer';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setCoinTotal } from "../src/redux/machineSlice";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const resetTimer = jest.fn();

describe('CashContainer', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            machine: {
                selectedProducts: [],
                coinTotal: 0
            }
        });

        render(
            <Provider store={store}>
                <CashContainer resetTimer={resetTimer} />
            </Provider>
        );
    });


    test('renders coin options and total price', () => {
        const coinOptions = screen.getAllByTestId('coin-option');
        expect(coinOptions.length).toBe(4);
        const totalPrice = screen.getByText(/total: \$/i);
        expect(totalPrice).toBeInTheDocument();
    });

    test('adds coin to coinTotal when valid coin is clicked', () => {

        const coinOptions = screen.getAllByTestId('coin-option');
        fireEvent.click(coinOptions[0]); // test için ilk madeni para seçildi
        expect(store.getActions()).toEqual([{ type: 'machine/setCoinTotal', payload: 1 }]);
    });

})


describe('CashContainer OTHER TEST', () => {
    let store;
    test('disables place order button if no product is selected or total price is higher than coin total', () => {
        store = mockStore({
            machine: {
                selectedProducts: [{ name: "cola", price: 25, currency: "$", imgSrc: "cola.svg", disabled: false, temperature: 6 }],
                coinTotal: 0.5
            }
        });
        render(
            <Provider store={store}>
                <CashContainer resetTimer={resetTimer} />
            </Provider>
        );
        const placeOrderButton = screen.getByText(/place_order/i);
        expect(placeOrderButton).toBeDisabled();
    });

    test('resets selected products and coinTotal and calls resetTimer when cancel button is clicked', async () => {
        render(
            <Provider store={store}>
                <CashContainer resetTimer={resetTimer} />
            </Provider>
        );
        const cancelButton = screen.getByText(/cancel/i);
        fireEvent.click(cancelButton); // test için cancel butonuna tıklandı
        await expect(store.getActions()).toEqual([
            { type: 'machine/setSelectedProducts', payload: [] },
            { type: 'machine/setCoinTotal', payload: 0 },
            { type: 'machine/setResetProductItem', payload: new Date().toISOString() }]);
    });

})
