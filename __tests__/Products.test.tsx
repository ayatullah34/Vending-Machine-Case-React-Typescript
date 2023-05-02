import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Products from '../src/components/Products';

const mockStore = configureMockStore([]);
const resetTimer = jest.fn();

describe('Products', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            machine: {
                resetProductItem: false,
                selectedProducts: []
            }
        });

        component = render(
            <Provider store={store}>
                <Products resetTimer={resetTimer} />
            </Provider>
        );
    });

    it('renders correctly', () => {
        expect(component).toMatchSnapshot();
    });

    it('handles product click correctly', () => {
        const productItem = component.getByText('taco');
        fireEvent.click(productItem);
        expect(store.getActions()).toEqual([
            {
                type: 'machine/setSelectedProducts',
                payload: [{ name: "taco", price: 60, currency: "$", imgSrc: "taco.svg", disabled: false, temperature: 6}]
            }
        ]);
    });
});
