import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../components/Cart';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { clearCart, removeFromCart } from '../features/cart/cartSlice';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

// Now Mocking the action creators
jest.mock('../features/cart/cartSlice', () => ({
    clearCart: jest.fn(() => ({ type: 'CLEAR_CART' })),
    removeFromCart: jest.fn((id) => ({ type: 'REMOVE_FROM_CART', payload: id })),
}));

describe('Cart Component', () => {
    beforeEach(() => {
    jest.clearAllMocks();
    });

    it('renders empty cart message', () => {
    const store = mockStore({ cart: [] });

    render(
        <Provider store={store}>
        <Cart />
        </Provider>
    );

    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
    });

    it('renders cart items and responds to "Remove item" click', () => {
    const store = mockStore({
        cart: [
        {
            id: 1,
            title: 'Sample Product',
            price: 9.99,
            quantity: 2,
            image: 'https://via.placeholder.com/150',
        },
        ],
    });

    store.dispatch = jest.fn();

    render(
        <Provider store={store}>
        <Cart />
        </Provider>
    );

    expect(screen.getByText(/Sample Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Qty: 2/i)).toBeInTheDocument();

    // Using the getByRole for better accessibility querying
    const removeBtn = screen.getByRole('button', { name: /remove item/i });
    fireEvent.click(removeBtn);

    expect(removeFromCart).toHaveBeenCalledWith(1);
    expect(store.dispatch).toHaveBeenCalledWith({
        type: 'REMOVE_FROM_CART',
        payload: 1,
    });
    });
});
