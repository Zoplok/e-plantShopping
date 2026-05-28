import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/CartSlice.jsx";

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="page-shell">
      <div className="page-intro">
        <div className="section-kicker">Cart</div>
        <h1>Your shopping cart</h1>
        <p>Review quantities, remove plants you do not need, and see your total.</p>
      </div>

      <section className="cart-summary">
        <div>
          <strong>Total cart amount</strong>
          <p className="price large">${totalAmount.toFixed(2)}</p>
        </div>
        <div className="cart-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => setCheckoutMessage("Checkout coming soon!")}
          >
            Checkout
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </section>

      {checkoutMessage ? <p className="checkout-message">{checkoutMessage}</p> : null}

      <div className="cart-list">
        {cartItems.length === 0 ? (
          <div className="empty-state">
            <h2>Your cart is empty</h2>
            <p>Add a few plants from the listing to get started.</p>
          </div>
        ) : (
          cartItems.map((item) => {
            const itemTotal = item.price * item.quantity;

            return (
              <article key={item.id} className="cart-row">
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>Unit price: ${item.price.toFixed(2)}</p>
                  <p>Total: ${itemTotal.toFixed(2)}</p>
                </div>
                <div className="quantity-controls">
                  <button
                    type="button"
                    className="quantity-button"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    type="button"
                    className="quantity-button"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Delete
                </button>
              </article>
            );
          })
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="cart-footer">
          <button
            type="button"
            className="secondary-button"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>
      ) : null}
    </main>
  );
}

