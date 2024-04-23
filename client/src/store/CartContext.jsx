import { createContext, useReducer } from "react";

// Create a context to manage the cart data
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

// Function to manage the cart state
function cartReducer(state, action) {
  // Add an item to the cart
  if (action.type === "ADD_ITEM") {
    // Check exisiting item in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // Copy the existing item to update
    const updatedItems = [...state.items];

    // Check if the item already exists in the cart, just update the quantity
    if (existingCartItemIndex > -1) {
      // Locate the existing item in the cart
      const existingItem = state.items[existingCartItemIndex];

      // Copy the existing item to update quantity
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      // Update the item in the cart
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // Add a new item to the cart
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  // Remove an item from the cart
  if (action.type === "REMOVE_ITEM") {
    // Check the existing item by id
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    // Get the existing item
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    // Check if the quantity is 1
    if (existingCartItem.quantity === 1) {
      // remove the item from the cart
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      // quantity > 1
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };

      // Update the item in the cart
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  // Clear the cart
  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

//--- Component to provide the context --//
export function CartContextProvider({ children }) {
  // useReducer hook to manage the cart state
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  // Add item to the cart function
  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  }

  // Remove item from the cart function
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  }

  // Clear the cart function
  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  // Cart context to provide the cart data
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
