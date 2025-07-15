import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '../components/Home';

const queryClient = new QueryClient();

test('renders Home component and shows loading state', async () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </Provider>
  );

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  // Wait for product data to load
  await waitFor(() => {
    expect(screen.getByText(/Product Inventory/i)).toBeInTheDocument();
  });
});