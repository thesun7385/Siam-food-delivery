import React from "react";
import thaiFood from "../assets/thai-food.png";

export default function Error({ title, message }) {
  return (
    <div className="error">
      <h1>404 Page Not Found</h1>
      <p>{title}</p>
      <img src={thaiFood} alt="Thai food" />
      <button className="btn-error">Contact us</button>
      {/* <p>{message}</p> */}
    </div>
  );
}
