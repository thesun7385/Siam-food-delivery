import { useContext } from "react";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";

// MealItem component
export default function MealItem({ meal }) {
  // Context for Cart feature goes here..
  const cartCtx = useContext(CartContext);

  // Function to add meal to cart
  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }

  return (
    <li>
      {/* Food card */}
      <div className="menu-content">
        <img className="menu-img" src={meal.image} alt={meal.name} />
        <h3 className="menu-name">{meal.name}</h3>
        <span class="menu-detail">{meal.description}</span>
        <span class="menu-preci">{currencyFormatter.format(meal.price)}</span>
        <p className="meal-item-actions">
          <Button className="addCart-btn" onClick={handleAddMealToCart}>
            Add to Cart
          </Button>
        </p>
      </div>
    </li>
  );
}
