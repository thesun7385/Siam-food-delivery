import logoImg from "../assets/logo.png";
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Button from "./UI/Button.jsx";
import "./Header.css";

// Header component
export default function Header() {
  const cartCtx = useContext(CartContext);

  // Get the user progress context
  const userProgressCtx = useContext(UserProgressContext);

  // Get the total quantity of items in the cart
  const totalCartItems = cartCtx.items.reduce((totalNum, item) => {
    return totalNum + item.quantity;
  }, 0);

  // Function to show the cart
  function handleShowCart() {
    userProgressCtx.showCart(); // call the showCart function from the UserProgressContext
  }

  return (
    <>
      <header className="l-header" id="header">
        <nav className="nav bd-container">
          <div className="title">
            <img src={logoImg} id="thai-food-icon" alt="thai-food" />
            <a href="#" className="nav-logo">
              SIAM FOOD
            </a>
          </div>
          <div className="nav-menu" id="nav-menu">
            <ul className="nav-list">
              <li className="nav-item">
                <a href="#home" className="nav-link active-link">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#services" className="nav-link">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a href="#menu" className="nav-link">
                  Menu
                </a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link">
                  About
                </a>
              </li>

              <li className="nav-item">
                <a href="#contact" className="nav-link">
                  Contact us
                </a>
              </li>
            </ul>
          </div>
          {/* Drop-down menu icon */}
          <div className="nav-toggle" id="nav-toggle">
            <i className="material-symbols-outlined">menu</i>
          </div>
          {/* Cart icon */}
          <div>
            <button className="shopping-cart" onClick={handleShowCart}>
              <i type="button" className="material-symbols-outlined nav-cart">
                shopping_cart
              </i>
              <p> Cart ({totalCartItems})</p>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
