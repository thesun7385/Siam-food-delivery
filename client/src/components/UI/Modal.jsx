import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose, className = "" }) {
  // Create a ref to the dialog element
  const dialog = useRef();

  // useEffect hook to handle the modal open and close
  useEffect(() => {
    const modal = dialog.current;

    // If open is true, show the modal
    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
