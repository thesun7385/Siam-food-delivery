import { createContext, useState } from "react";

// Create a context to manage the user progress
const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

// Component to manage the user progress
export function UserProgressContextProvider({ children }) {
  const [useProgress, setUserProgress] = useState({});
  const [isClosing, setIsClosing] = useState(false);
  function showCart() {
    setUserProgress("cart");
  }

  // Trigger the hideCart function and the animaton
  function hideCart() {
    setIsClosing(true);
    setTimeout(() => {
      setUserProgress("");
      setIsClosing(false);
    }, 200); // Match the duration of the closing animation
  }

  function showCheckout() {
    setUserProgress("checkout");
  }

  function hideCheckout() {
    setIsClosing(true);
    setTimeout(() => {
      setUserProgress("");
    }, 200); // Match the duration of the closing animation
  }

  // User progress context object for the provider
  const userProgressCtx = {
    progress: useProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
    isClosing,
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
