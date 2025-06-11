import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({
  show,
  hide,
  position = "center", // e.g center-right, right, left, fullscreen
  maxWidth = 500,
  background = "#fff",
  children,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 50); // Fix for first-time issue
    } else if (shouldRender) {
      setIsAnimating(false);
      setTimeout(() => setShouldRender(false), 400); // Wait for animation before unmounting
    }
  }, [show]);

  if (!shouldRender) return null;

  return ReactDOM.createPortal(
    <div
      className={`modal-overlay ${isAnimating ? "show" : "hide"}`}
      onClick={hide}
    >
      <div
        className={`modal-content ${position} ${
          isAnimating ? "open" : "closing"
        }`}
        style={{
          maxWidth: position !== "fullscreen" && `${maxWidth}px`,
          background: background,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
