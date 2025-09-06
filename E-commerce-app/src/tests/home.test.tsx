
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../components/Home';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);
const queryClient = new QueryClient();

const mockProducts = [
    {
    id: 1,
    title: 'Test Product',
    price: 19.99,
    category: 'electronics',
    description: 'Description of test product',
    rating: { rate: 4.5 },
    image: 'https://via.placeholder.com/150',
    },
];

const mockCategories = ['electronics', 'clothing'];

jest.mock('../api/api', () => ({
    fetchProducts: jest.fn(() => Promise.resolve(mockProducts)),
    fetchCategories: jest.fn(() => Promise.resolve(mockCategories)),
}));

describe('Home Component', () => {
    it('renders products and allows category selection', async () => {
    const store = mockStore({});

    render(
        <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <Home />
        </QueryClientProvider>
        </Provider>
    );

    // Wait for all product titles to appear, get all and pick the first one
    const productTitles = await screen.findAllByText(/Test Product/i);
    expect(productTitles.length).toBeGreaterThan(0);
    expect(productTitles[0]).toBeInTheDocument();

    // Interact with the category select dropdown
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'electronics' } });

    expect(select).toHaveValue('electronics');
    });
});

