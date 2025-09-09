import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../components/Home';
import Cart from '../components/Cart';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import React from 'react';
import '@testing-library/jest-dom';

// This is a helper to render with Redux and React Query providers
function renderWithProviders(ui: React.ReactNode, { preloadedState = {} } = {}) {
    const store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState,
    });

    const queryClient = new QueryClient();

    return {
    ...render(
        <Provider store={store}>
        <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
        </Provider>
    ),
    store,
    };
}

const mockProducts = [
    {
    id: 1,
    title: 'Integration Product',
    price: 29.99,
    category: 'books',
    description: 'Integration product desc',
    rating: { rate: 4.2 },
    image: 'https://via.placeholder.com/150',
    },
];

const mockCategories = ['books'];

jest.mock('../api/api', () => ({
    fetchProducts: jest.fn(() => Promise.resolve(mockProducts)),
    fetchCategories: jest.fn(() => Promise.resolve(mockCategories)),
}));

describe('Integration Test: Add to Cart updates Cart', () => {
    it('adds item to cart and updates Cart component', async () => {
    renderWithProviders(
        <>
        <Home />
        <Cart />
        </>
    );

    // Now Waiting for the product title to appear.
    const productTitle = await screen.findByRole('heading', { name: /Integration Product/i });
    expect(productTitle).toBeInTheDocument();

    // Clicking the Add to Cart button next to that product
    // Find the button associated with this product
    // Using the get by role button named "Add to Cart"
    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);

    // After click, waiting for the cart to update
    // Within cart, checking the product title and quantity
    // Using findByRole to get the cart heading first, and to be sure it's rendered
    const cartHeading = await screen.findByRole('heading', { name: /shopping cart/i });
    expect(cartHeading).toBeInTheDocument();

    // Checking that cart contains product title.
    const cartItems = await screen.findAllByText(/Integration Product/i);
    expect(cartItems.length).toBeGreaterThanOrEqual(1);

    // Checking the quantity text in the cart
    expect(screen.getByText(/Qty: 1/i)).toBeInTheDocument();

    // Checking the final price text in the cart.
    expect(screen.getByText(/Final Price: \$29.99/i)).toBeInTheDocument();
    });
});