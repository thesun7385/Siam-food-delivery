import { useContext } from "react";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartContext from "../store/CartContext.jsx";
import Modal from "./UI/Modal.jsx";
import Button from "./UI/Button.jsx";
import { currencyFormatter } from "../util/formatting.js";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  // Get the cart context by accessing the CartContext obj.
  const cartCtx = useContext(CartContext);

  // Get the user progress context
  const userProgressCtx = useContext(UserProgressContext);

  // Get the total price
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  // Functions to handle closing the cart and going to checkout
  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckOut() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <div className="cart-container">
        <div className="cart-item-container">
          <div className="cart-title">Shopping Cart</div>
          {cartCtx.items.length > 0 ? (
            <ul>
              {cartCtx.items.map((item) => (
                <CartItem
                  key={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  price={item.price}
                  image={item.image}
                  onIncrease={() => cartCtx.addItem(item)}
                  onDecrease={() => cartCtx.removeItem(item.id)}
                />
              ))}
            </ul>
          ) : (
            "There is no item in your cart."
          )}
        </div>

        <div className="modal-actions">
          {cartCtx.items.length > 0 && (
            <p className="cart-total">
              <p className="cart-total-name">
                Sub Total: {currencyFormatter.format(cartTotal)}
              </p>
              <p className="cart-total-name">
                Tax: {currencyFormatter.format(cartTotal * 0.13)}
              </p>
              <p className="cart-total-name">Delivery: Free</p>

              <p className="cart-total-name">
                Total: {currencyFormatter.format(cartTotal * 1.13)}
              </p>
            </p>
          )}

          <p className="cart-btn">
            <Button className="close-btn" textOnly onClick={handleCloseCart}>
              Close
            </Button>

            {cartCtx.items.length > 0 && (
              <Button
                className="checkout-btn"
                textOnly
                onClick={handleGoToCheckOut}
              >
                Checkout
              </Button>
            )}
          </p>
        </div>
      </div>
    </Modal>
  );
}
