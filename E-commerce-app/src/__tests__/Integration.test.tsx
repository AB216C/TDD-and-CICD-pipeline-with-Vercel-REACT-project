import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '../app/store';
import App from '../App';

const queryClient = new QueryClient();

test('adds product to cart and updates total', async () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  );

  // Wait for products to load
  await waitFor(() => screen.getByText(/Add to Cart/i));

  const addToCartButtons = screen.getAllByText(/Add to Cart/i);
  expect(addToCartButtons.length).toBeGreaterThan(0);

  await userEvent.click(addToCartButtons[0]);

  // Cart should reflect the added item
  await waitFor(() =>
    expect(screen.getByText(/Total Number of Items: 1/i)).toBeInTheDocument()
  );
});
