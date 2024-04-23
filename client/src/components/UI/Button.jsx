import React from "react";

export default function Button({ children, textOnly, className, ...props }) {
  // Add the text-button if textOnly
  let cssClasses = textOnly ? "text-button" : "button";

  // Add the className prop to the cssClasses
  cssClasses += ` ${className}`;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
