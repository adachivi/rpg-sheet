const DefaultPopup = ({ isOpen, onClose, children }) => {

  if (!isOpen) {
    return (null);
  }
  else {
    return (
    <>
      <div className="modal">
        <button className="closeButton" onClick={onClose}>X</button>
        {children}
      </div>

      <style>{`

      .modal {
        position: fixed;
        top: 0.5%;
        left: 50%;
        transform: translate(-50%);
        background: #fff;
        padding: 20px 25px 15px;
        border-radius: 20px;
        box-shadow: 0px 4px 10px rgba(0,0,0,0.3);
        z-index: 1000
      }

      .closeButton {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        border: none;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        color: rgb(51,51,51);
        cursor: pointer
      }
      
      .closeButton:hover {
        background: rgb(255,0,0);
        color: rgb(242,242,242);
        border-radius: 50%
      }

      `}</style>
    </>
    );
  };

}

export default DefaultPopup;