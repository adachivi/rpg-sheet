import React from "react";

const Modal = ({ isOpen, isClose, children }) => {

  if (!isOpen) {
    return (null);
  }
  else {
    return (
      <div>
        <div>
          <button onClick={onClose}>X</button>
          {children}
        </div>
      </div>
    );
  };

}

export default Modal;