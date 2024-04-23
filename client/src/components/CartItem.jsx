import { currencyFormatter } from "../util/formatting.js";

export default function CartItem({
  name,
  quantity,
  price,
  image,
  onIncrease,
  onDecrease,
}) {
  return (
    <li>
      {/* Cart item */}

      <div className="cart-item">
        <div className="cart-item-image">
          <img src={`http://localhost:3000/${image}`} alt={name} />
        </div>

        <div className="cart-item-name">
          <span>{name}</span>
          <span className="cart-item-quantity">
            <button className="minus-btn" onClick={onDecrease}>
              -
            </button>
            <span>{quantity}</span>
            <button className="plus-btn" onClick={onIncrease}>
              +
            </button>
          </span>
        </div>

        <span className="cart-item-price">
          {currencyFormatter.format(price)}
        </span>
      </div>
    </li>
  );
}
