import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import Cart from '../components/Cart';
import { CartItem } from '../features/cart/types';

const mockCart: CartItem[] = [
  {
    id: 1,
    title: 'Sample Product',
    price: 20,
    quantity: 2,
    image: 'https://example.com/image.png',
  },
];

test('renders Cart with items and calculates totals', () => {
  const store = configureStore({
    reducer: {
      cart: () => mockCart,
    },
  });

  render(
    <Provider store={store}>
      <Cart />
    </Provider>
  );

  expect(screen.getByText(/Sample Product/i)).toBeInTheDocument();
  expect(screen.getByText(/Qty: 2/i)).toBeInTheDocument();
  expect(screen.getByText(/Final Price: \$40.00/i)).toBeInTheDocument();
});