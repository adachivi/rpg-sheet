import React from "react";

const LoadingModal = ({ isOpen, onClose, children }) => {

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

export default LoadingModal;