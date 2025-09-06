
// __tests__/CartIntegration.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../components/Home';
import Cart from '../components/Cart';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import React from 'react';
import '@testing-library/jest-dom';

// Helper to render with Redux and React Query providers
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

    // Wait for the product title to appear (product list)
    const productTitle = await screen.findByRole('heading', { name: /Integration Product/i });
    expect(productTitle).toBeInTheDocument();

    // Click the Add to Cart button next to that product
    // Find the button associated with this product
    // Assuming button is next to the product title, you can use DOM traversal or get all buttons and filter
    // Here, we just get by role button named "Add to Cart"
    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);

    // After clicking, wait for the cart to update
    // In cart, check product title and quantity
    // Use findByRole to get the cart heading first, just to be sure it's rendered
    const cartHeading = await screen.findByRole('heading', { name: /shopping cart/i });
    expect(cartHeading).toBeInTheDocument();

    // Now check that cart contains product title (can appear twice, but we assert at least one)
    // Use findAllByText since product title appears multiple times (product list and cart)
    const cartItems = await screen.findAllByText(/Integration Product/i);
    expect(cartItems.length).toBeGreaterThanOrEqual(1);

    // Check quantity text in the cart
    expect(screen.getByText(/Qty: 1/i)).toBeInTheDocument();

    // Check final price text in the cart (format may vary based on your component)
    expect(screen.getByText(/Final Price: \$29.99/i)).toBeInTheDocument();
    });
});