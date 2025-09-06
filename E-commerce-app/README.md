
## To Install and run the application
npx create-vite E-commerce-app --template react-ts,
cd E-commerce-app,
npm install @reduxjs/toolkit,
npm install react-redux,
npm install @tanstack/react-query,
npm install axios,
npm run dev,

Brwose: http://localhost:5173

## Application Features

The application is made of product inventory and shoppingcart, and both user interface features were generated using React, React Query, FakeStoreApi, and Redux Toolkit. React was used to render components, ReactQuery was essential for API request and caching, Redux Tookit was used for managing global state for the cart, while fakeStoreApi had all data to be displayed to the UI.


More specifically, api folder contain api.ts file and it is essential for generating all data for UI. Without api.ts file, we have no data to populate on UI. With api.ts, we can see all products in the store and product categories

In the app folder, we have store.ts file which is essential in setting up Redux toolkit. In this file, we export store to be used and accessed glabally. We export Rootstate to be used in type safety checking when accessing data, and we export AppDispatch to be used in type safety when dispatching actions.

In features/cart folder, there is two file: first one is types.ts which is essential in type safety especially for redux states and action. This file define the shape of the cart item and is is re-used throughout the application.
Second file is cartSlice.ts and this is where reducers and actions are created and after being created, they are exported to be used in components. This file use sessionStorage, a built-in Web-API which is essential in which cart updates are saved to help in restoring cart state on page reloads and preventing user data loss during users hoverings sessions.

The components folder has two files: Cart.tsx and Home.tsx: Cart.tsx use three important imported  features. The first one is RootState and CartItem which are essential in ensuring strong type safety. Second is removeFromCart and clearCart which are useful in modifying cart state, and lastly is useSelector and useDispatch which is useful for Redux state access and control, especially on this code:const cart = useSelector((state: RootState) => state.cart) as CartItem[], it reads cart data from Redux and unsure UI is updated up on modification through delete or add actions.

In addition, Home.tsx file contain imported and important features. For example, it uses imported useQuery from ReactQuery for datafetching by which all products and product categories are fetched, cached and refetched and it handles loading, error, and success of the state. Another feature is useDispatch and addToCart by which add to cart happens through redux integration. This component employ useState to filter products by category dynamically and also stimulate useQuery to refetch products when category changes through queryKey: ['products', selectedCategory]. 

Lastly, main.tsx component has a very important feature which is shown using this code:import { QueryClient, QueryClientProvider } from '@tanstack/react-query' which allows the use of React Query for data fetching, caching, and updating. Plus, as the app get wrapped inside queryClientProvider, it automatically give access to all components to useQuery() and useMutation().


TESTS DESCRIPTIONS




npm install --save-dev @babel/preset-env @babel/preset-typescript @babel/preset-react babel-jest


npm install --save-dev jest ts-jest @types/jest @babel/preset-env @babel/preset-react @babel/preset-typescript babel-jest

Packages installations

npm install --save-dev redux-mock-store @types/redux-mock-store jest ts-jest @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest typescript react react-dom @types/react @types/react-dom react-redux @reduxjs/toolkit


npm install --save-dev @testing-library/jest-dom


npm install --save-dev identity-obj-proxy



