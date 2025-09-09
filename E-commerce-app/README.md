
## To Install and run the application
npx create-vite E-commerce-app --template react-ts,
cd E-commerce-app,
npm install @reduxjs/toolkit,
npm install react-redux,
npm install @tanstack/react-query,
npm install axios,
npm run dev,

Brwose: http://localhost:5173

# TESTS  PACKAGES TO DOWNLOAD

npm install --save-dev @babel/preset-env @babel/preset-typescript @babel/preset-react babel-jest


npm install --save-dev jest ts-jest @types/jest @babel/preset-env @babel/preset-react @babel/preset-typescript babel-jest

Packages installations

npm install --save-dev redux-mock-store @types/redux-mock-store jest ts-jest @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest typescript react react-dom @types/react @types/react-dom react-redux @reduxjs/toolkit

npm install --save-dev @testing-library/jest-dom

npm install --save-dev identity-obj-proxy


Install Vercel CLI

npm install -g vercel

# TEST DESCRIPTIONS

## cart.test.tsx

The purpose of the test is to show the behavior of the cart component. Specifically, what it renders when the cart is empty, how it behaves in the presence of items in the cart, and whether the correct Redux actions are being dispatched (removeFromCart or ClearCart).

For example, render, screen, and fireEvent are React Testing Library Helpers that render a component and simulate user interactions. Also, jest-dom adds additional matchers such as ".toBeInTheDocument".

There are two different tests running in the cart components. The first one is "Renders Empty Cart". The test makes sure that if the cart is empty, it should display the message that says "Your cart is empty."

The second test is about rendering cart Items and handling the "remove" click from the users. The test checks if the correct item data is displayed, and correct Redux Actions and dispatch are called once the remove item button is clicked.

## Home.test.tsx

Testing if the Products render from the mocked api. The purpose of the test is to make sure the product data is fetched and displayed correctly.

Testing if the category breakdown is present by ensuring the mechanism for filtering the products based on their categories is present and working.

The test is also checking that the Home component is responsive to the user input, especially when selecting different categories.

## Integration.test.tsx

It tests the interaction between components. It also checks the State Management via Redux. This test checks the async data flow via React Query. Further, this test ensures data fetching works with mock, especially when products are loaded from a mock api. It makes sure the cart shows the correct item, quantity, and price. 

## Link to the Live Website: 

https://tdd-and-cicd-pipeline-with-vercel-react-project-3adv-r00yiflj9.vercel.app
