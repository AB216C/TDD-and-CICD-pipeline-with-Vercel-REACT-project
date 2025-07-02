
import { removeFromCart, clearCart } from '../features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import type { CartItem } from '../features/cart/types';

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart) as CartItem[];;
  const dispatch = useDispatch();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.quantity * item.price, 0);

  const handleCheckout = () => {
    dispatch(clearCart());
    alert('Cart has been cleared. You checked out successfully!');
  };

  return (
    <div className="p-4 border-t mt-6">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. Please add more items!</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id} className="flex items-center mb-2">
                <img src={item.image} alt={item.title} className="h-12 w-12 object-contain mr-2" />
                <div className="flex-1">
                  <p>{item.title}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-4">Total Items: {totalItems}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>

          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}