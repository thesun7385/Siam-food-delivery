import { useContext } from "react";
import { currencyFormatter } from "../util/formatting.js";
import Modal from "./UI/Modal.jsx";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

// Checkout component
export default function Checkout() {
  // Use the useContext hook to get the cart context
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // Post the meals data
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp(
    "https://siam-delivery-server.onrender.com/orders",
    requestConfig
  );

  // Get the total price and tax
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  // Function to close the checkout modal
  function handleClose() {
    // userProgressCtx.hideCheckout();
    userProgressCtx.hideCart();
  }

  // Function to finish the checkout
  function handleFinish() {
    // userProgressCtx.hideCheckout();
    userProgressCtx.hideCart();
    cartCtx.clearCart();
    clearData();
  }

  // Function to prevent the form from submitting
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    // Convert the FormData object to an object
    const customerData = Object.fromEntries(fd.entries());

    // Send a request
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  // Validate data is sending
  let actions = (
    <>
      <p className="btn-checkout-container">
        <Button
          type="button"
          className="close-btn"
          textOnly
          onClick={handleClose}
        >
          Close
        </Button>
        <Button textOnly className="checkout-btn">
          Submit Order
        </Button>
      </p>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  // Suyccessful order
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onclose={handleFinish}
      >
        <h2>Order Successful!</h2>
        <p>Your order has been successfully submitted.</p>
        <p>Please expect to hear from us within the next few minutes.</p>
        <p className="modal-actions">
          <Button className="ok-btn" onClick={handleFinish}>
            Okay
          </Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      className={`modal ${userProgressCtx.isClosing ? "closing" : ""}`}
      open={userProgressCtx.progress === "checkout"}
      onClose={handleClose}
    >
      <div className="submit-title">Checkout</div>
      <form onSubmit={handleSubmit}>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail" type="email" id="email" />
        <Input label="Address" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="total-checkout">
          <p className="total-checkout-text">
            Total Amount: {currencyFormatter.format(cartTotal * 1.13)}
          </p>
        </p>
        {/* Display the actions */}
        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
