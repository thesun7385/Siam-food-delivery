import logoImg from "../assets/logo.png";
import { useContext, useState, useEffect } from "react";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

import "./Header.css";

// Header component
export default function Header() {
  const cartCtx = useContext(CartContext);
  // Get the user progress context
  const userProgressCtx = useContext(UserProgressContext);

  // State to store the scroll position and the visibility of the menu
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use effect to listen to the scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add event listener to the scroll event
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Get the total quantity of items in the cart
  const totalCartItems = cartCtx.items.reduce((totalNum, item) => {
    return totalNum + item.quantity;
  }, 0);

  //function  to show the menu
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  // Function to show the cart
  function handleShowCart() {
    userProgressCtx.showCart(); // call the showCart function from the UserProgressContext
  }

  // Function to close the menu when a link is clicked
  function handleLinkClick() {
    setIsMenuOpen();
  }

  return (
    <>
      <header
        className={`l-header ${scrollY >= 200 ? "scroll-header" : ""}`}
        id="header"
      >
        <nav className="nav bd-container">
          <div className="title">
            <div>
              <img src={logoImg} id="thai-food-icon" alt="thai-food" />
            </div>
            <div>
              <a href="#" className="nav-logo">
                SIAM FOOD
              </a>
            </div>
          </div>
          <div
            className={`nav-menu ${isMenuOpen ? "show-menu" : ""}`}
            id="nav-menu"
          >
            <ul className="nav-list">
              <li className="nav-item">
                <a href="#home" className="nav-link" onClick={handleLinkClick}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#services"
                  className="nav-link"
                  onClick={handleLinkClick}
                >
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a href="#menu" className="nav-link" onClick={handleLinkClick}>
                  Menu
                </a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link" onClick={handleLinkClick}>
                  About
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="#contact"
                  className="nav-link"
                  onClick={handleLinkClick}
                >
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Cart icon */}
          <div className="cart-toggle-icon">
            <div>
              <button className="shopping-cart" onClick={handleShowCart}>
                <i type="button" className="material-symbols-outlined nav-cart">
                  shopping_cart
                </i>
                <span className="badge badge-warning" id="lblCartCount">
                  {totalCartItems}
                </span>
              </button>
            </div>
            {/* Drop-down menu icon */}
            <div className="nav-toggle" id="nav-toggle" onClick={toggleMenu}>
              <i className="material-symbols-outlined">menu</i>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
